#include <Arduino.h>
#include "PullupSystem.h"

//#include <Vector.h>

// not used:
FirebaseJsonArray* PullupSystem::getLastLog()
{
  struct Log log;
  addData("22");
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
    }
    
    inactive = true;

    if ((millis() - inactiveStartTime) > 2000) {
      Serial.println("[" + name + "] Timeout due to inactivity");
      stop();
    }
    
    return 0.0;
  }

  Serial.println(weight);

  if (inactive == true) {
    Serial.println("[" + name + "] Started work at: " + millis());
  }

  addData((String)weight);
  
  // reset inactive flag, since we detect weight
  inactive = false;
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
