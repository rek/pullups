/**
*
* The pullup hanging system thing.
*
*/

/*
*  IR Setup:
*/
#include <IRremote.h> // version 3.0 +
const int IR_RECEIVE_PIN = 9;
const boolean IR_ENABLE_LED_FEEDBACK = true;

/*
*
*  LCD Setup:
*/
#include <LiquidCrystal.h>
  const int rs = 12;
  const int en = 11;
  const int d4 = 5;
  const int d5 = 4;
  const int d6 = 3;
  const int d7 = 2;
  LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

/*
*
*  Load cell Setup:
*/
#include "HX711.h"
HX711 scale;
float calibration_factor = -2100;
#define LOADCELL_DOUT_PIN 6
#define LOADCELL_SCK_PIN 7


// display the current mode on the LCD
// eg: weight timer mode
//int displayingMode;
//void displayMode() {
//  
//}

class DisplaySystem {
  public:
//    DisplaySystem();
    void printMessage(char line1[], char line2[]);
    void displayInTopRight(int text);
    void displayInBottomRight(int text);
    
  private:
    void clearFirstLine();
    void clearSecondLine();
    void clearLine(int line);
    
//    static LiquidCrystal _lcd;
};
//DisplaySystem::DisplaySystem() {
//  _lcd = lcd;
//}

void DisplaySystem::printMessage(char line1[], char line2[]) {
  clearFirstLine();
  lcd.setCursor(0, 0);
  lcd.print(line1);
  
  if (line2) {
    clearSecondLine();
    lcd.setCursor(0, 1);
    lcd.print(line2); 
  }
}
void DisplaySystem::clearFirstLine() {
  clearLine(0);
}
void DisplaySystem::clearSecondLine() {
  clearLine(1);
}
void DisplaySystem::clearLine(int line) {
  lcd.setCursor(0, line);
  lcd.print("             "); // 13
}
// set game type
void DisplaySystem::displayInTopRight(int text) {
    lcd.setCursor(13, 0);
    lcd.print("M:" + text);
//    Serial.print("Printing mode at 13:");
//    Serial.println(text);
}
// set user
void DisplaySystem::displayInBottomRight(int text) {
    lcd.setCursor(13, 1);
    lcd.print("U:" + text);
}

/*
*
*  Pullup system setup:
*/
class MainSystem {
  public:
    MainSystem();
    DisplaySystem displaySystem;
    void displayScreenInformation();
    void changeMode(int newMode);
    void changeUser(int newUser);
  private:
    int _currentMode;
    int _currentUser;   

    const int _MODE_PULLUPS = 1;
    void displayPullupSystem();
    
    const int _MODE_SCALE = 2;
    void displayWeight();
    int _displayingWeight;
    
    const int _MODE_TIMER = 3;
    void displayTimerSystem();
    int _hangStart;
    int _hangEnd;

};
MainSystem::MainSystem()
{
  _displayingWeight = 0;
  _currentMode = _MODE_SCALE;

  Serial.println("Starting display system.");
  DisplaySystem displaySystemForMain;
  displaySystem = displaySystemForMain;

  Serial.println("Starting main system.");
}
void MainSystem::displayScreenInformation() {
  delay(200);
//  Serial.println("Displaying screen");
//  Serial.print("Current mode ");
//  Serial.println(this->_currentMode);
  
  if (this->_currentMode == this->_MODE_PULLUPS) {
//    Serial.println("Matched mode 1");
    this->displayPullupSystem();  
  }
  if (this->_currentMode == this->_MODE_SCALE) {
//    Serial.println("Matched mode 2");
    this->displayWeight();  
  }
  if (this->_currentMode == this->_MODE_TIMER) {
//    Serial.println("Matched mode 3");
    this->displayTimerSystem();  
  }
}
void MainSystem::changeMode(int newMode) {
  Serial.print("Setting mode to: ");
  Serial.println(newMode);
  
  _currentMode = newMode;
  displaySystem.displayInTopRight(newMode);
}
void MainSystem::changeUser(int newUser) {
  Serial.print("Setting user to: ");
  Serial.println(newUser);
  
  _currentUser = newUser;
  displaySystem.displayInBottomRight(newUser);
}
// mode 1
void MainSystem::displayPullupSystem() {
  char line1[] = "Pullup mode";
  char line2[] = "";
  displaySystem.printMessage(line1, line2);
}
// mode 3
void MainSystem::displayTimerSystem() {
  char line1[] = "Hang to";
  char line2[] = "start";
  displaySystem.printMessage(line1, line2);
}
// mode 2
void MainSystem::displayWeight() {
  char line1[] = "Activating";
  char line2[] = "scale";
  displaySystem.printMessage(line1, line2);
    
  Serial.println("Skipping mode as scale not connected");
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
    lcd.setCursor(0, 1);
    // clear all previous text - incase new weight is shorter
    lcd.print("     ");
    lcd.setCursor(0, 1);
    lcd.print(_displayingWeight);
  }

  // display on the end:
  lcd.setCursor(4, 1);
  lcd.print("kg");
}

/*
*
*  Main:
*/
void setup()
{
  Serial.begin(9600);

  /*
  *  LCD section
  */
  lcd.begin(16, 2);
  lcd.print("Initializing...");

  /*
  *  IR section
  */
  IrReceiver.begin(IR_RECEIVE_PIN, IR_ENABLE_LED_FEEDBACK); 

  /*
  *  Load cell section
  */
//  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
//  scale.set_scale(calibration_factor);     // Adjust to this calibration factor
//  scale.tare();                            // Reset the scale to 0

  // after scale is setup
  // we need to clear init text 
  // and start the program display
  lcd.clear();
  lcd.setCursor(0, 0);
  //lcd.print("Weight:");

  Serial.println("Setup complete.");
}

MainSystem mainSystem;

void interceptIRSignal() {
  if (IrReceiver.decode()) {
    IrReceiver.resume();

    switch (IrReceiver.decodedIRData.command) {
      case 12: Serial.println("Pressed 1"); mainSystem.changeMode(1); break;
      case 24: Serial.println("Pressed 2"); mainSystem.changeMode(2); break;
      case 94: Serial.println("Pressed 3"); mainSystem.changeMode(3); break;
      case  8: Serial.println("Pressed 4"); break;
      case 28: Serial.println("Pressed 5"); break;
      case 90: Serial.println("Pressed 6"); break;
      case 66: Serial.println("Pressed 7"); mainSystem.changeUser(1); break;
      case 82: Serial.println("Pressed 8"); mainSystem.changeUser(2); break;
      case 74: Serial.println("Pressed 9"); mainSystem.changeUser(3); break;
    }
  }
}

void loop()
{
  delay(500);

  // always check for signals from the remote
  interceptIRSignal();

  mainSystem.displayScreenInformation();
}