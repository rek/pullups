#include <Arduino.h>
#include <LiquidCrystal.h>

class DisplaySystem
{
public:
  LiquidCrystal _lcd;
  DisplaySystem();

  void printMessage(String line1, String line2);
  void displayInTopRight(int text);
  void displayInBottomRight(int text);
  void toggleLCD();

private:
  void clearFirstLine();
  void clearSecondLine();
  void clearLine(int line);

  // cache current displaying lines
  // so we only re-render if they change
  String _currentLineOne = "";
  String _currentLineTwo = "";
};
