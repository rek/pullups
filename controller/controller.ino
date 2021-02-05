/**
*
* The pullup hanging system thing.
*
* v0.1.1
*
*/

#include "DisplaySystem.h"
#include "HangTimerSystem.h"
#include "WeighingSystem.h"

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
float calibration_factor = -2100;
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

  int pollingInterval = 1500;

  void displayScreenInformation();
  void changeMode(int newMode);
  void changeUser(int newUser);

  void runCurrentMode();
  void init();

private:
  int _currentMode;
  int _currentUser;

  const int _MODE_PULLUPS = 1;
  void displayPullupSystem();

  const int _MODE_SCALE = 2;
  void displayWeight();
  int _displayingWeight;

  const int _MODE_TIMER = 3;

  void startCurrentMode();
  void stopCurrentMode();
};
MainSystem::MainSystem()
{
  _displayingWeight = 0;
  _currentMode = _MODE_TIMER;
}
// doing this stuff here, because the constructor
// is called before Serial is initialized
void MainSystem::init()
{
  Serial.println("---------------------");
  Serial.println("Initializing main system.");

  Serial.println("Initializing display system.");
  DisplaySystem displaySystem;
  // displaySystem = displaySystemForMain;
  Serial.println("Initializing hang timer system.");
  HangTimerSystem hangTimerSystem;
}
void MainSystem::stopCurrentMode()
{
  Serial.println("Stop current mode called");
}
void MainSystem::runCurrentMode()
{
  if (scale.is_ready() == 1)
  {
    int newWeight = scale.get_units();

    if (_currentMode == _MODE_PULLUPS)
    {
      //  pullupSystem.addTime(newWeight)
    }

    if (_currentMode == _MODE_SCALE)
    {
      //  weighingSystem.addTime(newWeight)
    }

    if (_currentMode == _MODE_TIMER)
    {
      if (hangTimerSystem.isRunning)
      {
        if (hangTimerSystem.hasStarted)
        {
          displaySystem.printMessage("Weighing", "");
        }
        hangTimerSystem.addTime(newWeight);
      }
      else
      {
        if (hangTimerSystem.hasStarted)
        {
          displaySystem.printMessage("Final:", (String)hangTimerSystem.finalResult);
        }
      }
    }
  }
  else
  {
    Serial.println("Scale not ready, nothing happening.");
  }
}
void MainSystem::startCurrentMode()
{
  if (_currentMode == _MODE_PULLUPS)
  {
    pollingInterval = 50;
  }
  if (_currentMode == _MODE_SCALE)
  {
    pollingInterval = 1500;
  }
  if (_currentMode == _MODE_TIMER)
  {
    pollingInterval = 100;
    //    Serial.println("Start mode!");
    hangTimerSystem.start();
    displaySystem.printMessage("Timer", "");
  }
}
// display the current mode on the LCD
// eg: weight timer mode
void MainSystem::displayScreenInformation()
{
  delay(200);

  if (this->_currentMode == this->_MODE_PULLUPS)
  {
    //    Serial.println("Matched mode 1");
    this->displayPullupSystem();
  }
  if (this->_currentMode == this->_MODE_SCALE)
  {
    //    Serial.println("Matched mode 2");
    this->displayWeight();
  }
  if (this->_currentMode == this->_MODE_TIMER)
  {
    //    Serial.println("Matched mode 3");
    //    displaySystem.printMessage("Timer", "");
  }
}
void MainSystem::changeMode(int newMode)
{
  Serial.print("Setting mode to: ");
  Serial.println(newMode);

  _currentMode = newMode;
  startCurrentMode();
  displaySystem.displayInTopRight(newMode);
}
void MainSystem::changeUser(int newUser)
{
  Serial.print("Setting user to: ");
  Serial.println(newUser);

  _currentUser = newUser;
  displaySystem.displayInBottomRight(newUser);
}
// mode 1
void MainSystem::displayPullupSystem()
{
  displaySystem.printMessage("Pullups", "");
}
// mode 2
void MainSystem::displayWeight()
{
  displaySystem.printMessage("Scale", "");

  // Serial.println("Skipping mode as scale not connected");
  return;

  //  int roundNumber(int num)
  //  {
  //    int rounded = num;
  //
  //    return rounded;
  //  }
  //  int newWeight = roundNumber(scale.get_units());
  int newWeight = scale.get_units();

  // only display weight if it changes, to stop flashing
  if (_displayingWeight != newWeight)
  {
    _displayingWeight = newWeight;
    // lcd.setCursor(0, 1);
    // clear all previous text - incase new weight is shorter
    // lcd.print("     ");
    // lcd.setCursor(0, 1);
    // lcd.print(_displayingWeight);
  }

  // display on the end:
  // lcd.setCursor(4, 1);
  // lcd.print("kg");
}

MainSystem mainSystem;

/*
*
*  Main:
*/
void setup()
{
  Serial.begin(9600);

  /*
  *  IR section
  */
  IrReceiver.begin(IR_RECEIVE_PIN, IR_ENABLE_LED_FEEDBACK);

  /*
  *  Load cell section
  */
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(calibration_factor); // Adjust to this calibration factor
  scale.tare();                        // Reset the scale to 0

  mainSystem.init();

  Serial.println("Setup complete.");

  mainSystem.runCurrentMode();
  Serial.print("Poling interval: ");
  Serial.println(mainSystem.pollingInterval);
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
  delay(mainSystem.pollingInterval);

  // always check for signals from the remote
  // this will change the mode
  // when the right buttons are pressed
  interceptIRSignal();

  mainSystem.displayScreenInformation();

  mainSystem.runCurrentMode();
}
