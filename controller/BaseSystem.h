#pragma once
#include <Arduino.h>

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
  }
};
