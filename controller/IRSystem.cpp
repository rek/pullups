/*
*   IR Setup:
*/
//#include <IRremote.h> // version 3.0 +
//const int IR_RECEIVE_PIN = 26;
//const boolean IR_ENABLE_LED_FEEDBACK = false;

/*
     IR section
  */
//  Serial.print("Initializing IR system... ");
//  IrReceiver.begin(IR_RECEIVE_PIN, IR_ENABLE_LED_FEEDBACK);
//  Serial.println("complete!");

// @todo - refactor to class/file?
//void interceptIRSignal()
//{
//  if (IrReceiver.decode())
//  {
//    IrReceiver.resume();
//
//    switch (IrReceiver.decodedIRData.command)
//    {
//      case 12:
//        Serial.println("Pressed 1");
//        mainSystem.changeMode(1);
//        break;
//      case 24:
//        Serial.println("Pressed 2");
//        mainSystem.changeMode(2);
//        break;
//      case 94:
//        Serial.println("Pressed 3");
//        mainSystem.changeMode(3);
//        break;
//      case 8:
//        Serial.println("Pressed 4");
//        break;
//      case 28:
//        Serial.println("Pressed 5");
//        break;
//      case 90:
//        Serial.println("Pressed 6");
//        break;
//      case 66:
//        Serial.println("Pressed 7");
//        mainSystem.changeUser(1);
//        break;
//      case 82:
//        Serial.println("Pressed 8");
//        mainSystem.changeUser(2);
//        break;
//      case 74:
//        Serial.println("Pressed 9");
//        mainSystem.changeUser(3);
//        break;
//      case 67:
//        Serial.println("Pressed Play/Pause");
//        mainSystem.displaySystem.toggleLCD();
//        break;
//      case 71:
//        Serial.println("Pressed global stop");
//        mainSystem.stopCurrent();
//        break;
//      default:
//        Serial.print("Unknown key:");
//        Serial.println(IrReceiver.decodedIRData.command);
//    }
//  }
//}
