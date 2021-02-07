/**
*
* The pullup hanging system thing.
*
* v0.1.1
*
*/
#include <Arduino.h>

#include "DisplaySystem.h"
#include "HangTimerSystem.h"
#include "WeighingSystem.h"
#include "PullupSystem.h"

/*
*  IR Setup:
*/
#include <IRremote.h> // version 3.0 +
const int IR_RECEIVE_PIN = 9;
const boolean IR_ENABLE_LED_FEEDBACK = false;

/*
*
*  Load cell Setup:
*/
#include "HX711.h"
HX711 scale;
float calibration_factor = -23000;
#define LOADCELL_DOUT_PIN 6
#define LOADCELL_SCK_PIN 7

/*
*
*  Pullup system setup:
*/
class MainSystem
{
public:
  MainSystem();
  DisplaySystem displaySystem;
  HangTimerSystem hangTimerSystem;
  WeighingSystem weighingSystem;
  PullupSystem pullupSystem;

  int pollingInterval = 1000;

  void changeMode(int newMode);
  void changeUser(int newUser);

  void runCurrentMode();
  void init();

private:
  int _currentMode;
  int _currentUser;

  const int _MODE_PULLUPS = 1;
  const int _MODE_SCALE = 2;
  const int _MODE_TIMER = 3;

  void startCurrentMode();
};
MainSystem::MainSystem()
{
  _currentMode = _MODE_TIMER;
}

// doing this stuff here, because the constructor
// is called before Serial is initialized
void MainSystem::init()
{
  Serial.println("---------------------");
  Serial.println("Initializing main system.");

  /*
  *  IR section
  */
  Serial.print("Initializing IR system... ");
  IrReceiver.begin(IR_RECEIVE_PIN, IR_ENABLE_LED_FEEDBACK);
  Serial.println("complete!");

  /*
  *  Load cell section
  */
  Serial.print("Initializing scale system... ");
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(calibration_factor); // Adjust to this calibration factor
  scale.tare();                        // Reset the scale to 0
  Serial.println("complete!");

  Serial.println("Initializing display system.");
  DisplaySystem displaySystem;
  // displaySystem = displaySystemForMain;
  Serial.println("Initializing hang timer system.");
  HangTimerSystem hangTimerSystem;
  Serial.println("Setup complete.");
  displaySystem.printMessage("Ready");
}

void MainSystem::runCurrentMode()
{
  bool canStart = true;
//  bool canStart = scale.is_ready() == 1;
  if (canStart)
  {
    float newWeight = 0.4;
//    float newWeight = scale.get_units();

    if (_currentMode == _MODE_PULLUPS)
    {
      if (pullupSystem.isRunning)
      {
        if (pullupSystem.hasStarted)
        {
          displaySystem.printMessage("Running...");
        }
        pullupSystem.addTime(newWeight);
      }
      else // if has stopped:
      {
        displaySystem.printMessage("Stopped");
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
  else
  {
    Serial.println("Scale not ready, waiting for init...");
  }
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
  Serial.begin(9600);

  mainSystem.init();

  Serial.print("Polling interval: ");
  Serial.println(mainSystem.pollingInterval);
  mainSystem.runCurrentMode();
}

// @todo - refactor to class/file?
void interceptIRSignal()
{
  if (IrReceiver.decode())
  {
    IrReceiver.resume();

    switch (IrReceiver.decodedIRData.command)
    {
    case 12:
      Serial.println("Pressed 1");
      mainSystem.changeMode(1);
      break;
    case 24:
      Serial.println("Pressed 2");
      mainSystem.changeMode(2);
      break;
    case 94:
      Serial.println("Pressed 3");
      mainSystem.changeMode(3);
      break;
    case 8:
      Serial.println("Pressed 4");
      break;
    case 28:
      Serial.println("Pressed 5");
      break;
    case 90:
      Serial.println("Pressed 6");
      break;
    case 66:
      Serial.println("Pressed 7");
      mainSystem.changeUser(1);
      break;
    case 82:
      Serial.println("Pressed 8");
      mainSystem.changeUser(2);
      break;
    case 74:
      Serial.println("Pressed 9");
      mainSystem.changeUser(3);
      break;
    case 67:
      Serial.println("Pressed Play/Pause");
      mainSystem.displaySystem.toggleLCD();
      break;
    default:
      Serial.print("Unknown key:");
      Serial.println(IrReceiver.decodedIRData.command);
    }
  }
}

void loop()
{
  //  Serial.println("Polling: " + (String) mainSystem.pollingInterval);
  delay(mainSystem.pollingInterval);

  // always check for signals from the remote
  // this will change the mode
  // when the right buttons are pressed
  interceptIRSignal();

  mainSystem.runCurrentMode();
}
