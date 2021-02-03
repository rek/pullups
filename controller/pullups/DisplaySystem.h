#include <Arduino.h>
#include <LiquidCrystal.h>

class DisplaySystem
{
public:
  LiquidCrystal _lcd;
  DisplaySystem();
  // DisplaySystem() : _lcd(rs, en, d4, d5, d6, d7)
  // {
  // }

  void printMessage(char line1[], char line2[]);
  void displayInTopRight(int text);
  void displayInBottomRight(int text);
  void toggleLCD();
  void setupLCD();

private:
  void clearFirstLine();
  void clearSecondLine();
  void clearLine(int line);

  // LiquidCrystal _lcd(rs, en, d4, d5, d6, d7);

  // cache current displaying lines
  // so we only re-render if they change
  String _currentLineOne = "";
  String _currentLineTwo = "";
};