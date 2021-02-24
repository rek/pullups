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
  FirestoreHelpers firestoreHelpers;
  _firestoreHelpers = firestoreHelpers;
}

void Storage::readItem()
{
}

void Storage::addItem(char *name)
{
  FirebaseJson oneLog;
  oneLog.set("fields/duration/integerValue", 103);
  oneLog.set("fields/logs/arrayValue/values", _data);
  
  String finalContent;
  oneLog.toString(finalContent);
  
  // make the users path
  char documentPath[100];
  strcpy(documentPath, "testing/");
  strcat(documentPath, name);
  strcat(documentPath, "/logs");
  
  _firestoreHelpers.addJson(documentPath, finalContent);
}
