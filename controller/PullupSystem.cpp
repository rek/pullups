#include <Arduino.h>
#include "PullupSystem.h"

//#include <Vector.h>

Log PullupSystem::getLastLog()
{
  struct Log log;

  addData("22");
//  
//  FirebaseJson entry;
//  entry.add("integerValue", "1");
//
//  _data.add(entry);
//  FirebaseJson entry1;
//  entry1.add("integerValue", "2");
//
//  FirebaseJsonArray container;
//  container.add(entry);
//  container.add(entry1);


  log.name = "test";
  log.data = getData();

//  const int ELEMENT_COUNT_MAX = 1000;
//  int storage_array[ELEMENT_COUNT_MAX];
//  Vector<int> vector(storage_array);
//  vector.push_back(2);
//  vector.push_back(77);

//  log.data = vector;

  return log;
}

float PullupSystem::addTime(float weight)
{
  //  Serial.println("[" + name + "] Adding weight: " + weight);

  // has not started hanging yet
  if ((int)weight == 0)
  {
    if (inactive == false) {
      Serial.println("[" + name + "] Started inactivity at: " + millis());
      inactiveStartTime = millis();
    }
    
    inactive = true;

    if ((millis() - inactiveStartTime) > 5000) {
      Serial.println("[" + name + "] Timeout due to inactivity");
      stop();
    }
    
    return 0.0;
  }

  Serial.println(weight);

  if (inactive == true) {
    Serial.println("[" + name + "] Started work at: " + millis());
  }
  
  // reset inactive flag, since we detect weight
  inactive = false;

  // record ... or something ...

}

int PullupSystem::getPollingInterval() { return 1; }

void PullupSystem::stop()
{
  baseStop();
}

void PullupSystem::reset()
{
  baseReset();

  inactive = false;
}
