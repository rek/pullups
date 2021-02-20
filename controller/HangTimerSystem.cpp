#include <Arduino.h>
#include "HangTimerSystem.h"

float HangTimerSystem::addTime(float weight)
{
  // has not started hanging yet
  if ((int)weight == 0)
  {
    return 0.0;
  }

  Serial.println("[" + name + "] Adding weight: " + weight);

  if (isRunning == true)
  {
    hasStarted = true;
    //  Serial.println(" - Running");

  }

//  Serial.println("[" + name + "] - Returning");

  return asti;
}

String HangTimerSystem::getFinalResult()
{
  return (String)finalResult + " kg";
}

int HangTimerSystem::getPollingInterval() { return 500; }

void HangTimerSystem::reset()
{
  baseReset();
  
  asti = -1;
  previous = 0;
}

void HangTimerSystem::stop()
{
  baseStop();

  hangDuration = stopTime - startTime;
  finalResult = previous;
}
