#include <Arduino.h>

#include "DisplaySystem.h"

/*
 * Esp32
 *
*/
const int rs = 19;
const int en = 23;
const int d4 = 18;
const int d5 = 17;
const int d6 = 16;
const int d7 = 15;
/*
 * Arduino
const int rs = 12;
const int en = 11;
const int d4 = 5;
const int d5 = 4;
const int d6 = 3;
const int d7 = 2;
 */

/*
*
*  LCD Setup:
*/

DisplaySystem::DisplaySystem() : _lcd(rs, en, d4, d5, d6, d7)
{
  Serial.println("Initializing display system.");
  _lcd.begin(16, 2);
  _lcd.clear();
  printMessage("Initializing", "");
}

void DisplaySystem::toggleLCD()
{
  Serial.print("Learn how to toggle the LCD on/off please...");
}

void DisplaySystem::printFirstLine(String line)
{

  if (_currentLineOne != line)
  {
    // easy debug:
    //     Serial.println("Drawing line 1");
    //     Serial.print("a: ");
    //     Serial.println(_currentLineOne);
    //     Serial.print("b: ");
    //     Serial.println(line);
    clearFirstLine();
    _currentLineOne = line;
    _lcd.setCursor(0, 0);
    _lcd.print(line);
  }
}
void DisplaySystem::printMessage(String line)
{
  printFirstLine(line);
}
void DisplaySystem::printMessage(String line1, String line2)
{
  printFirstLine(line1);

  if (_currentLineTwo != line2)
  {
    // Serial.println("Drawing line 2");
    clearSecondLine();
    _currentLineTwo = line2;
    _lcd.setCursor(0, 1);
    _lcd.print(line2);
  }
}

void DisplaySystem::clearFirstLine()
{
  _currentLineOne = "";
  clearLine(0);
}

void DisplaySystem::clearSecondLine()
{
  _currentLineTwo = "";
  clearLine(1);
}

void DisplaySystem::clearLine(int line)
{
  _lcd.setCursor(0, line);
  _lcd.print("             "); // 13
}

// set game type
void DisplaySystem::displayInTopRight(int text)
{
  _lcd.setCursor(13, 0);
  _lcd.print("M:");
  _lcd.print(text);
  //    Serial.print("Printing mode at 13:");
  //    Serial.println(text);
}

// set user
void DisplaySystem::displayInBottomRight(int text)
{
  _lcd.setCursor(13, 1);
  _lcd.print("U:");
  _lcd.print(text);
}
