#include <Arduino.h>
#include "BaseSystem.h"

FirebaseJsonArray _data;

void BaseSystem::baseReset() {
  startTime = 0;
  stopTime = 0;
  isRunning = false;
  hasStarted = false;
  //  _data.clear(); // cleared after save now
  Serial.println("[" + name + "] - Running reset");
  
}

void BaseSystem::baseStop(){
  Serial.println("[" + name + "] - Running stop");
  isRunning = false;
  stopTime = millis();  
  hangDuration = stopTime - startTime;  
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

void BaseSystem::addData(float i) {
  FirebaseJson dataPoint;
  dataPoint.add("doubleValue", i);
  _data.add(dataPoint);
};
void BaseSystem::addData(String i) {
  FirebaseJson dataPoint;
  dataPoint.add("integerValue", i);
//  Serial.print("Adding string data point: ");
//  Serial.println(i);
  _data.add(dataPoint);
};

FirebaseJsonArray* BaseSystem::getData() {
  return &_data;
}
