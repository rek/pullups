#include "DisplaySystem.h"

const int rs = 12;
const int en = 11;
const int d4 = 5;
const int d5 = 4;
const int d6 = 3;
const int d7 = 2;

/*
*
*  LCD Setup:
*/

DisplaySystem::DisplaySystem() : _lcd(rs, en, d4, d5, d6, d7)
{
}

void DisplaySystem::setupLCD()
{
  // _lcd = lcd;
}

void DisplaySystem::toggleLCD()
{
  Serial.print("Learn how to toggle the LCD on/off please...");
}
void DisplaySystem::printMessage(char line1[], char line2[])
{
  if (_currentLineOne != line1)
  {
    _currentLineOne = line1;
    Serial.println("Drawing line 1");
    Serial.print("_currentLineOne: ");
    Serial.println(_currentLineOne);
    Serial.print("line1: ");
    Serial.println(line1);
    clearFirstLine();
    _lcd.setCursor(0, 0);
    _lcd.print(line1);
  }

  if (_currentLineTwo != line2)
  {
    Serial.println("Drawing line 2");
    _currentLineTwo = line2;
    clearSecondLine();
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
