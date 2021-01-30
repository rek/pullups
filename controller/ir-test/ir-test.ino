/**
 *
 * /
 *
 * /*

  IR Setup:
*/
#include <IRremote.h>
const int IR_RECEIVE_PIN = 9;
IRrecv IrReceiver(IR_RECEIVE_PIN);

/*

  Main:
*/
void setup()
{
	Serial.begin(9600);

	/*
    IR section
  */
	//  IrReceiver.enableIRIn();
	//  IrReceiver.blink13(true);
}

//decode_results IRResults;
void loop()
{
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

void dump(decode_results *results)
{
	//   int count = results->value;
	Serial.println(results->value);
}
