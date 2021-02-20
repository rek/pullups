#include <WiFi.h>
//#include <Firebase_ESP_Client.h>

#include "Storage.h"

//#include "FirestoreHelpers.h"

#define USER_EMAIL "rekarnar@gmail.com"
#define USER_PASSWORD "testingESP32__"
#define WIFI_SSID "TinyBhavan"
#define WIFI_PASS "anetteisgreat"

void Storage::setupWifi()
{
  Serial.println();
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

//Firebase + Firestore
void Storage::setupFirebase()
{
//  FirestoreHelpers _firestoreHelpers;

//  FirestoreHelpers();
}

void Storage::readItem()
{
}
void Storage::addItem()
{
//  FirebaseJson entry;
//  entry.add("integerValue", "1");
//  FirebaseJson entry1;
//  entry1.add("integerValue", "2");
//
//  FirebaseJsonArray container;
//  container.add(entry);
//  container.add(entry1);
//
//  FirebaseJson oneLog;
//  oneLog.set("fields/logs/arrayValue/values", container);
//  oneLog.set("fields/weight/integerValue", 97);
//  oneLog.set("fields/duration/integerValue", 100);
//
//  // make the users path
//  const char *user = "adam"; 
//  char documentPath[100];   
//  strcpy(documentPath,"testing/");
//  strcat(documentPath,user);
//  strcat(documentPath,"/logs");
//
//  _firestoreHelpers.addJson(documentPath, oneLog);
}
