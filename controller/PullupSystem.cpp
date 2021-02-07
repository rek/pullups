#include <Arduino.h>
#include "PullupSystem.h"

float PullupSystem::addTime(float weight)
{
  Serial.println("[" + name + "] Adding weight: " + weight);

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

  // record ... or something ...

}

int PullupSystem::getPollingInterval() { return 50; }

void PullupSystem::stop()
{
  baseStop();
}

void PullupSystem::reset()
{
  baseReset();

  inactive = false;
}
