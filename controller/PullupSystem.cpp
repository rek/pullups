#include <Arduino.h>
#include "PullupSystem.h"

float PullupSystem::addTime(float weight)
{
  //  Serial.println("[" + name + "] Adding weight: " + weight);
  Serial.println(weight);

  // has not started hanging yet
  if ((int)weight == 0)
  {
    if (inactive == false) {
      Serial.println("[" + name + "] Started inactivity");
      inactiveStartTime = millis();
    }
    
    inactive = true;

    // Serial.println("[" + name + "] " + millis() + " - " + inactiveStartTime);

    if ((millis() - inactiveStartTime) > 5000) {
      Serial.println("[" + name + "] Timeout due to inactivity");
      stop();
    }
    
    return;
  }
  
  // reset inactive flag, since we detect weight
  inactive = false;

  // record ... or something ...

}

int PullupSystem::getPollingInterval() { return 10; }

void PullupSystem::stop()
{
  baseStop();
}

void PullupSystem::reset()
{
  baseReset();

  inactive = false;
}
