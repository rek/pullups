//#pragma once
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
