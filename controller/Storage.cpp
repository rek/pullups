#include <WiFi.h>
//#include <Firebase_ESP_Client.h>
#include "Storage.h"

#include "FirestoreHelpers.h"

#define WIFI_SSID "TinyBhavan"
#define WIFI_PASS "anetteisgreat"

void Storage::setupWifi()
{
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Initializing Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.print(" complete! (");
  Serial.print(WiFi.localIP());
  Serial.println(")");
}

//Firebase + Firestore
void Storage::setupFirebase()
{
  //  FirestoreHelpers firestoreHelpers;
  //  _firestoreHelpers = firestoreHelpers;
 
}

void Storage::readItem()
{
}

void Storage::addItem(Log l)
{
  FirestoreHelpers _firestoreHelpers;
  
  FirebaseJson oneLog;
  oneLog.set("fields/duration/integerValue", 101);

  // need to get this part working:
//  oneLog.set("fields/logs/arrayValue/values", l.data);

  //  oneLog.set("fields/weight/integerValue", 97);

  Serial.println("===trying to add:");
  String content2;
  oneLog.toString(content2);
  Serial.println(content2.c_str());
  
  // make the users path
  char documentPath[100];
  strcpy(documentPath, "testing/");
  strcat(documentPath, l.name);
  strcat(documentPath, "/logs");

  _firestoreHelpers.addJson(documentPath, content2);
//  _firestoreHelpers.addJson(documentPath, oneLog);
}
