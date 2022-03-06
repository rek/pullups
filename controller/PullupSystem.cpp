#include <Arduino.h>
#include "PullupSystem.h"

//#include <Vector.h>
#include <string>  

// not used:
FirebaseJsonArray* PullupSystem::getLastLog()
{
  struct Log log;
  log.name = "test";
  return getData();
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
      inactive = true;
    } 

    if ((millis() - inactiveStartTime) > 2000) {
      Serial.println("[" + name + "] Timeout due to inactivity");
      pollingInterval = 2000;
      stop();
    }
    
    return 0.0;
  }

  pollingInterval = 1;
  Serial.println(weight);

  if (inactive == true) {
    Serial.println("[" + name + "] Started work at: " + millis());
  }

  addData(weight);
  
  // reset inactive flag, since we detect weight
  inactive = false;
}

int PullupSystem::getPollingInterval() { return pollingInterval; }

void PullupSystem::stop()
{
  baseStop();
}

void PullupSystem::reset()
{
  baseReset();
  pollingInterval = 1;

  inactive = false;
}
