#pragma once
#include <Firebase_ESP_Client.h>
//#include "FirestoreHelpers.h"

#include "BaseSystem.h"

class Storage
{
public:
//  FirestoreHelpers _firestoreHelpers;
  
  void setupWifi();
  void setupFirebase();
  void addItem(Log l);
  void readItem();
};
