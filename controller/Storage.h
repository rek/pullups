#pragma once
#include "FirestoreHelpers.h"

class Storage
{
public:
  FirestoreHelpers _firestoreHelpers;
  
  void setupWifi();
  void setupFirebase();
  void addItem();
  void readItem();
};
