#include <WiFi.h>
#include <Firebase_ESP_Client.h>
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
  return;
  
  FirestoreHelpers _firestoreHelpers;
  
  FirebaseJson oneLog;
  oneLog.set("fields/logs/arrayValue/values", l.data);
//  oneLog.set("fields/weight/integerValue", 97);
  oneLog.set("fields/duration/integerValue", 101);

  // make the users path
  const char *user = "adam"; 
  char documentPath[100];   
  strcpy(documentPath,"testing/");
  strcat(documentPath,user);  
  strcat(documentPath,"/logs");

//  _firestoreHelpers.addJson(documentPath, oneLog);
}
