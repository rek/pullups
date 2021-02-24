#pragma once
#include <Arduino.h>
#include <Firebase_ESP_Client.h>

extern FirebaseJsonArray _data;

struct Log {
  char *name;
//  Vector<int> data;
  // FirebaseJsonArray data;
  String data;
};

class BaseSystem
{
public:
  //
  // abstract:
  //
  virtual void stop() = 0;
  virtual void reset() = 0;
  virtual float addTime(float weight) = 0;
  virtual int getPollingInterval() = 0;

  //
  // base:
  //
  String name = "Base";
  int start(String name);
  void baseStop();
  void baseReset();
  unsigned long startTime;
  unsigned long stopTime;

  bool hasStarted = false;
  bool isRunning = false;

  void setRunning(bool running)
  {
    isRunning = running;
  };

  void addData(String i);
  FirebaseJsonArray* getData();

private:
  // store the current data coming in in this object:
//  FirebaseJsonArray _data;
};
