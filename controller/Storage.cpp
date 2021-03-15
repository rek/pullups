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
//  FirestoreHelpers _firestoreHelpers;
//  FirebaseJson result;
//  _firestoreHelpers.getDocument(&result);
//
//  FirebaseJsonData extractedData;
//  result.get(extractedData, "documents/[0]/fields/active/stringValue");
//  Serial.println("Current user: " + extractedData.stringValue);

}

void Storage::readItem()
{
}

void Storage::addItem(int duration, int pollTime)
{
  FirestoreHelpers _firestoreHelpers;

  // GET CURRENT USER:
  FirebaseJson result;
  _firestoreHelpers.getDocument(&result);
  FirebaseJsonData extractedData;
  result.get(extractedData, "documents/[0]/fields/active/stringValue");
  String currentUser = extractedData.stringValue;
  //Serial.println("Current user: " + currentUser);

  // make the object to add:
  FirebaseJson oneLog;
  oneLog.set("fields/duration/integerValue", duration);
  oneLog.set("fields/pollTime/integerValue", pollTime);
  oneLog.set("fields/processed/booleanValue", false);
  oneLog.set("fields/logs/arrayValue/values", _data);
  
  String finalContent;
  oneLog.toString(finalContent);
  
  // make the users path
  char documentPath[100];
  strcpy(documentPath, "users/");
  strcat(documentPath, currentUser.c_str());
  strcat(documentPath, "/logs");
  
  _firestoreHelpers.addJson(documentPath, finalContent);
}
