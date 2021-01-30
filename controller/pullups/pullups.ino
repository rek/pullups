/**
 *
 * /
 *
 * /*

  IR Setup:
*/
//#include <IRremote.h>
//const int IR_RECEIVE_PIN = 9;
//IRrecv IrReceiver(IR_RECEIVE_PIN);

/*

  LCD Setup:
*/
#include <LiquidCrystal.h>
const int rs = 12;
const int en = 11;
const int d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

/*

  Load cell Setup:
*/
#include "HX711.h"
HX711 scale;
float calibration_factor = -2100;
#define LOADCELL_DOUT_PIN 6
#define LOADCELL_SCK_PIN 7

/*

  Pullup system setup:
*/
#define MODE_PULLUPS = 1;
#define MODE_SCALE = 2;
#define MODE_TIMER = 3;

/*

  Main:
*/
void setup()
{
  Serial.begin(9600);

  /*
    LCD section
  */
  lcd.begin(16, 2);
  lcd.print("Initializing...");

  /*
    IR section
  */
  //  IrReceiver.enableIRIn();
  //  IrReceiver.blink13(true);

  /*
    Load cell section
  */
  Serial.println("HX711 calibration sketch");
  Serial.println("Remove all weight from scale");
  Serial.println("After readings begin, place known weight on scale");
  Serial.println("Press + or a to increase calibration factor");
  Serial.println("Press - or z to decrease calibration factor");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale();
  scale.tare();                            //Reset the scale to 0
  long zero_factor = scale.read_average(); //Get a baseline reading
  Serial.print("Zero factor: ");           //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  Serial.println(zero_factor);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Weight:");

  Serial.println("Setup complete.");
}

int roundNumber(int num)
{
  int rounded = num;

  return rounded;
}

int displayingWeight = 0;

void printWeight()
{
  int newWeight = roundNumber(scale.get_units());

  // only display weight if it changes, to stop flashing
  if (displayingWeight != newWeight)
  {
    displayingWeight = newWeight;
    lcd.setCursor(0, 1);
    // clear all previous text - incase new weight is shorter
    lcd.print("     ");
    lcd.setCursor(0, 1);
    lcd.print(displayingWeight);
  }

  // display on the end:
  lcd.setCursor(4, 1);
  lcd.print("kg");
}

//decode_results IRResults;
void loop()
{
  //  delay(100);
  scale.set_scale(calibration_factor); //Adjust to this calibration factor
  printWeight();

  //    if (IrReceiver.decode(&IRResults)) {
  //      Serial.println("yes");
  //          dump(&IRResults);
  //    }

  //  if (IrReceiver.decode()) {  // Grab an IR code
  //    // Check if the buffer overflowed
  //    if (IrReceiver.results.overflow) {
  //      Serial.println("IR code too long. Edit IRremoteInt.h and increase RAW_BUFFER_LENGTH");
  //    } else {
  //
  //      //        Serial.println(IRResults.value, HEX);
  //
  //      IrReceiver.printIRResultShort(&Serial);
  //      Serial.println(IrReceiver.decodedIRData.address );
  //      //    Serial.print(IRResults.value);
  //      //    Serial.print(IRResults.rawlen);
  //      //        Serial.print(IRResults.rawbuf);
  //      if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
  //        Serial.print("Unknown IR Detected");
  //        // We have an unknown protocol, print more info
  //        IrReceiver.printIRResultRawFormatted(&Serial, true);
  //      }
  //      Serial.println();
  //
  //
  //      IrReceiver.resume();
  //    }
  //  }
  //
  //    if (IrReceiver.decode(&IRResults)) {
  //      Serial.println(IRResults.value);
  //      switch (IRResults.decode_type) {
  //        case NEC: Serial.println("NEC"); break ;
  //        case SONY: Serial.println("SONY"); break ;
  //        case RC5: Serial.println("RC5"); break ;
  //        case RC6: Serial.println("RC6"); break ;
  //        case DISH: Serial.println("DISH"); break ;
  //        case SHARP: Serial.println("SHARP"); break ;
  //        case JVC: Serial.println("JVC"); break ;
  //        case SANYO: Serial.println("SANYO"); break ;
  //        case SAMSUNG: Serial.println("SAMSUNG"); break ;
  //        case LG: Serial.println("LG"); break ;
  //        case WHYNTER: Serial.println("WHYNTER"); break ;
  //        //      case AIWA_RC_T501: Serial.println("AIWA_RC_T501"); break ;
  //        case PANASONIC: Serial.println("PANASONIC"); break ;
  //        case DENON: Serial.println("DENON"); break ;
  //        default:
  //        case UNKNOWN: Serial.println("UNKNOWN"); break ;
  //      }
  //      IrReceiver.resume();
  //    }
}

//void dump(decode_results *results) {
//  //   int count = results->value;
//  Serial.println(results->value);
//}
