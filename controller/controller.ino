/**
*
*  The pullup hanging system thing.
*
*  v0.1.1
*
*/
#include <Arduino.h>

#include "DisplaySystem.h"
#include "HangTimerSystem.h"
#include "WeighingSystem.h"
#include "PullupSystem.h"

//ESP32_PANIC=ESP32_PANIC_PRINT_HALT;

/*
*   Load cell Setup:
*/
#include "HX711.h"
HX711 scale;

float calibration_factor = -11840; // esp32
//float calibration_factor = -23690; // arduino
#define LOADCELL_DOUT_PIN 25 // esp32
#define LOADCELL_SCK_PIN 33  // esp32
//#define LOADCELL_DOUT_PIN 6 // arduino
//#define LOADCELL_SCK_PIN 7 // arduino

/*
*   Storage Setup: (aka: firebase)
*/
#include "Storage.h"

/*
*
*   Main system setup:
*/
const int _MODE_PULLUPS = 1;
const int _MODE_SCALE = 2;
const int _MODE_TIMER = 3;
class MainSystem
{
public:
  MainSystem();
  DisplaySystem displaySystem;
  HangTimerSystem hangTimerSystem;
  WeighingSystem weighingSystem;
  PullupSystem pullupSystem;
  Storage storage;

  int pollingInterval = 1000;

  void changeMode(int newMode);
  void changeUser(int newUser);

  void runCurrentMode();
  void stopCurrent();
  void init();

private:
  int _currentMode = -1; // nothing auto starts
  int _currentUser;

  void startCurrentMode();
};
MainSystem::MainSystem()
{
  // set mode here if you want to force it:
  _currentMode = _MODE_PULLUPS;
}

// doing this stuff here, because the constructor
// is called before Serial is initialized
void MainSystem::init()
{
  Serial.println("---------------------");
  Serial.println("Initializing main system.");

  /*
     Load cell section
  */
  Serial.print("Initializing scale system... ");
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(calibration_factor); // Adjust to this calibration factor
  scale.tare();                        // Reset the scale to 0
  Serial.println("complete!");

  DisplaySystem displaySystem;
  HangTimerSystem hangTimerSystem;

  storage.setupWifi();
  storage.setupFirebase();

  Serial.println("Polling interval: " + (String)pollingInterval);
  Serial.println("Setup complete.");
  displaySystem.printMessage("Ready");

  startCurrentMode();
}

void MainSystem::runCurrentMode()
{
//  if (true) // fake when scale not attached
   if (!scale.is_ready())
  {
//    Serial.println("Scale not ready, waiting for init..");
    return;
  }

  // invert units because 'we' mounted the load call upside down
   float newWeight = scale.get_units() * -1;
//  float newWeight = 0.4; // fake when scale not attached

//    Serial.print("Weight:");
//    Serial.println(newWeight);

  if (_currentMode == -1)
  {
    Serial.println("No mode set. Doing nothing");
    return;
  }

  if (_currentMode == _MODE_PULLUPS)
  {
    pollingInterval = pullupSystem.getPollingInterval();  
        
    if (pullupSystem.isRunning)
    {
      displaySystem.printMessage("Recording");
      if (pullupSystem.hasStarted)
      {
        displaySystem.printMessage("Running...");
      }
      pullupSystem.addTime(newWeight);
    }
    else // if has stopped:
    {
      displaySystem.printMessage("Stopped");

      // save to firebase
      if (_data.size() != 0) {
        Serial.println("Going to save now");
        storage.addItem(pullupSystem.hangDuration);  
        _data.clear();
      }

      pullupSystem.start("test");
    }
  }

  if (_currentMode == _MODE_SCALE)
  {
    if (weighingSystem.isRunning)
    {
      if (weighingSystem.hasStarted)
      {
        displaySystem.printMessage("Weighing");
      }
      weighingSystem.addTime(newWeight);
    }
    else // if has stopped:
    {
      if (weighingSystem.hasStarted)
      {
        displaySystem.printMessage("Final:", weighingSystem.getFinalResult());
      }
    }
  }

  if (_currentMode == _MODE_TIMER)
  {
    if (hangTimerSystem.isRunning)
    {
      if (hangTimerSystem.hasStarted)
      {
        displaySystem.printMessage("Weighing");
      }
      hangTimerSystem.addTime(newWeight);
    }
    else // if has stopped:
    {
      if (hangTimerSystem.hasStarted)
      {
        displaySystem.printMessage("Final:", hangTimerSystem.getFinalResult());
      }
    }
  }
}

void MainSystem::stopCurrent()
{
  // hack just stop all
  pullupSystem.stop();
  weighingSystem.stop();
  hangTimerSystem.stop();
  _currentMode = -1;
}
void MainSystem::startCurrentMode()
{
  if (_currentMode == _MODE_PULLUPS)
  {
    pollingInterval = pullupSystem.start("Pullup System");
    displaySystem.printMessage("Pullups");
  }
  if (_currentMode == _MODE_SCALE)
  {
    pollingInterval = weighingSystem.start("Weighing System");
    displaySystem.printMessage("Scale");
  }
  if (_currentMode == _MODE_TIMER)
  {
    pollingInterval = hangTimerSystem.start("HangTimer System");
    displaySystem.printMessage("Timer");
  }
}

void MainSystem::changeMode(int newMode)
{
  Serial.println("Setting mode to: ->" + (String)newMode + "<-");

  _currentMode = newMode;
  startCurrentMode();
  displaySystem.displayInTopRight(newMode);
}

void MainSystem::changeUser(int newUser)
{
  Serial.println("Setting user to: " + newUser);

  _currentUser = newUser;
  displaySystem.displayInBottomRight(newUser);
}

MainSystem mainSystem;

/*
*
*  Main:
*/
void setup()
{
  // Serial.begin(9600); // arduino uno
  Serial.begin(115200); // esp32

  mainSystem.init();
}

void loop()
{
  //  Serial.println("Polling: " + (String) mainSystem.pollingInterval);
//  delay(0.1);
//  delay(mainSystem.pollingInterval);

  // always check for signals from the remote
  // this will change the mode
  // when the right buttons are pressed
  //  interceptIRSignal();

   mainSystem.runCurrentMode();
}
