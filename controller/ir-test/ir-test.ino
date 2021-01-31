/*
*  IR Setup:
*/
#include <IRremote.h>
const int IR_RECEIVE_PIN = 9;
const boolean IR_ENABLE_LED_FEEDBACK = true;

/*

  Main:
*/
void setup()
{
	Serial.begin(9600);

	/*
    IR section
  */
  IrReceiver.begin(IR_RECEIVE_PIN, IR_ENABLE_LED_FEEDBACK); 
	// IRReceiver.blink13(true);
}

void loop()
{
  if (IrReceiver.decode()) {
    // Serial.println(IrReceiver.decodedIRData.command);
    IrReceiver.resume();

    switch (IrReceiver.decodedIRData.command) {
      case 12: Serial.println("Pressed 1"); break;
      case 24: Serial.println("Pressed 2"); break;
      case 94: Serial.println("Pressed 3"); break;
      case  8: Serial.println("Pressed 4"); break;
      case 28: Serial.println("Pressed 5"); break;
      case 90: Serial.println("Pressed 6"); break;
      case 66: Serial.println("Pressed 7"); break;
      case 82: Serial.println("Pressed 8"); break;
      case 74: Serial.println("Pressed 9"); break;
    }
  }
}
