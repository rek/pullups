#include <Arduino.h>
#include "BaseSystem.h"

void BaseSystem::baseReset() {
  startTime = 0;
  stopTime = 0;
  isRunning = false;
  hasStarted = false;
  Serial.println("[" + name + "] - Running reset");
  
}

void BaseSystem::baseStop(){
  Serial.println("[" + name + "] - Running stop");
  isRunning = false;
  stopTime = millis();  
}

int BaseSystem::start(String _name)
{
  name = _name;
  // clear any previous run information
  reset();
  isRunning = true;
  startTime = millis();
  Serial.println("[" + name + "] - Running start");

  return getPollingInterval();
}

void BaseSystem::addData(String i) {
  FirebaseJson dataPoint;
  dataPoint.add("integerValue", i);
  _data.add(dataPoint);
};

FirebaseJsonArray BaseSystem::getData() {
  return _data;
}
