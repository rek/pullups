#pragma once
#include <Firebase_ESP_Client.h>

class FirestoreHelpers
{
public:
  FirestoreHelpers();
  
  /* Define the Firebase Data object */
  FirebaseData fbdo;
  
  /* Define the FirebaseAuth data for authentication data */
  FirebaseAuth firebaseAuth;
  
  /* Define the FirebaseConfig data for config data */
  FirebaseConfig firebaseConfig;
    
//  void addJsonArray(const char *, FirebaseJsonArray a);
//  void addJsonArray(const char *, FirebaseJsonArray a, const char *);
//  void addJson(const char *documentPath, FirebaseJson payload, const char *);
  void addJson(const char *documentPath, FirebaseJson payload);

  /* The helper function to get the token status string */
  String getTokenStatus(struct token_info_t info);
  
  /* The helper function to get the token type string */
  String getTokenType(struct token_info_t info);
  
  /* The helper function to get the token error string */
  String getTokenError(struct token_info_t info);

};
