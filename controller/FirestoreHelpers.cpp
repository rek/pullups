#include <WiFi.h>
//#include <Firebase_ESP_Client.h>

#include "FirestoreHelpers.h"
#include "Secrets.h"

#define FIREBASE_HOST "https://pullups-4eb8a-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_PROJECT_ID "pullups-4eb8a"
  
// NOTE: these 3 need to be global
FirebaseData fbdo;
FirebaseAuth firebaseAuth;
FirebaseConfig firebaseConfig;

FirestoreHelpers::FirestoreHelpers()
{
  Serial.print("Initializing Firestore... ");

  /* Assign the project host and api key (required) */
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.api_key = SECRET_API_KEY;

  /* Assign the user sign in credentials */
  firebaseAuth.user.email = SECRET_USER_EMAIL;
  firebaseAuth.user.password = SECRET_USER_PASSWORD;

  // Serial.println("Stage 1");

  Firebase.reconnectWiFi(true);

  // Serial.println("Stage 2");
  /* Initialize the library with the Firebase auth and config */
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  // Serial.println("Stage 3");
  fbdo.setResponseSize(4096);
  Serial.println("complete!");
  
  /* Get the token status */
  struct token_info_t info = Firebase.authTokenInfo();
  if (info.status == token_status_error)
  {
    Serial.printf("Token info: type = %s, status = %s\n", getTokenType(info).c_str(), getTokenStatus(info).c_str());
    Serial.printf("Token error: %s\n\n", getTokenError(info).c_str());
    //  abort();
  }
  else
  {
    Serial.printf("Token info: type = %s, status = %s\n\n", getTokenType(info).c_str(), getTokenStatus(info).c_str());
  }

}

/* The helper function to get the token type string */
String FirestoreHelpers::getTokenType(struct token_info_t info)
{
  switch (info.type)
  {
  case token_type_undefined:
    return "undefined";

  case token_type_legacy_token:
    return "legacy token";

  case token_type_id_token:
    return "id token";

  case token_type_custom_token:
    return "custom token";

  case token_type_oauth2_access_token:
    return "OAuth2.0 access token";

  default:
    break;
  }
  return "undefined";
}

/* The helper function to get the token status string */
String FirestoreHelpers::getTokenStatus(struct token_info_t info)
{
  switch (info.status)
  {
  case token_status_uninitialized:
    return "uninitialized";

  case token_status_on_signing:
    return "on signing";

  case token_status_on_request:
    return "on request";

  case token_status_on_refresh:
    return "on refreshing";

  case token_status_ready:
    return "ready";

  case token_status_error:
    return "error";

  default:
    break;
  }
  return "uninitialized";
}

/* The helper function to get the token error string */
String FirestoreHelpers::getTokenError(struct token_info_t info)
{
  String s = "code: ";
  s += String(info.error.code);
  s += ", message: ";
  s += info.error.message.c_str();
  return s;
}

//void FirestoreHelpers::addJsonArray(const char *documentPath, FirebaseJsonArray payload)
//{
//  String content;
//  payload.toString(content);
//
//  Serial.println("Json array patch");
//  Serial.println(content);
//  Serial.println(content.c_str());
//
//  if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "" /* databaseId can be (default) or empty */, documentPath, content.c_str()))
//  {
//      Serial.println("PASSED");
//      Serial.println("------------------------------------");
//      Serial.println(fbdo.payload());
//      Serial.println("------------------------------------");
//      Serial.println();
//  }
//  else
//  {
//      Serial.println("FAILED");
//      Serial.println("REASON: " + fbdo.errorReason());
//      Serial.println("------------------------------------");
//      Serial.println();
//  }
//
//}
//void FirestoreHelpers::addJsonArray(const char *documentPath, FirebaseJsonArray payload, const char *mask)
//{
//  String content;
//  payload.toString(content);
//
//  Serial.println("Json array add");
//
//  if (Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, content.c_str(), mask))
//  {
//    Serial.println("PASSED");
//    Serial.println("------------------------------------");
//    Serial.println(fbdo.payload());
//    Serial.println("------------------------------------");
//    Serial.println();
//  }
//  else
//  {
//    Serial.println("FAILED");
//    Serial.println("REASON: " + fbdo.errorReason());
//    Serial.println("------------------------------------");
//    Serial.println();
//  }
//}
//void FirestoreHelpers::addJson(const char *documentPath, FirebaseJson payload, const char *mask)
//{
//  String content;
//  payload.toString(content);
//  Serial.println("Json patch");
//  if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, content.c_str(), mask))
//  {
//    Serial.println("PASSED - Json add");
//    Serial.println("------------------------------------");
//    Serial.println(fbdo.payload());
//    Serial.println("------------------------------------");
//    Serial.println();
//  }
//  else
//  {
//    Serial.println("FAILED");
//    Serial.println("REASON: " + fbdo.errorReason());
//    Serial.println("------------------------------------");
//    Serial.println();
//  }
//}
void FirestoreHelpers::addJson(const char *documentPath, String payload)
{
  if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, payload.c_str()))
  {
//    Serial.println("PASSED");
//    Serial.println("------------------------------------");
//    Serial.println(fbdo.payload());
//    Serial.println("------------------------------------");
//    Serial.println();
  }
  else
  {
    Serial.println("FAILED: " + fbdo.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}
void FirestoreHelpers::addJson(const char *documentPath, FirebaseJson payload)
{
  String content;
  payload.toString(content);
  Serial.println("Json add");
  if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, content.c_str()))
  {
//    Serial.println("PASSED");
//    Serial.println("------------------------------------");
//    Serial.println(fbdo.payload());
//    Serial.println("------------------------------------");
//    Serial.println();
  }
  else
  {
    Serial.println("FAILED: " + fbdo.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}

void printResult(FirebaseData &data)
{
    FirebaseJson &json = data.jsonObject();
    Serial.println("Pretty printed JSON data:");
    String jsonStr;
    json.toString(jsonStr, true);
    Serial.println(jsonStr);
    Serial.println();
    Serial.println("Iterate JSON data:");
    Serial.println();
    size_t len = json.iteratorBegin();
    String key, value = "";
    int type = 0;
    for (size_t i = 0; i < len; i++)
    {
        json.iteratorGet(i, type, key, value);
        Serial.print(i);
        Serial.print(", ");
        Serial.print("Type: ");
        Serial.print(type == FirebaseJson::JSON_OBJECT ? "object" : "array");
        if (type == FirebaseJson::JSON_OBJECT)
        {
            Serial.print(", Key: ");
            Serial.print(key);
        }
        Serial.print(", Value: ");
        Serial.println(value);
    }
    json.iteratorEnd();
}
void FirestoreHelpers::getDocument(FirebaseJson *jsonResult) 
{
    String documentPath = "settings";
//    String mask = "active";

    Serial.println("------------------------------------");
    Serial.println("Get a document...");

    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str()))
//    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str()))
    {
//        Serial.println("PASSED");
//        Serial.println("------------------------------------");
        String result = fbdo.payload();
        // Serial.println("Result:"+result);
        jsonResult->setJsonData(result);
    }
    else
    {
        Serial.println("FAILED: " + fbdo.errorReason());
        Serial.println("------------------------------------");
        Serial.println();
    }
}
