#include <Arduino.h>
#include "HangTimerSystem.h"

float HangTimerSystem::addTime(float weight)
{
  Serial.println("[" + name + "] Adding weight: " + weight);

  // has not started hanging yet
  if ((int)weight == 0)
  {
    return;
  }

  if (isRunning == true)
  {
    hasStarted = true;
    Serial.println(" - Running");
    previous = (previous + weight) / 2;

    Serial.print(" - Previous: ");
    Serial.println(previous);
    Serial.print(" - Asti: ");
    Serial.println(asti);
    Serial.print(" - Asti * 10: ");
    Serial.println((int)asti * 10);
    // eg: 11.41 -> 114.10 = int 114
    if ((int)previous * 10 == (int)asti * 10)
    {
      stop();
    }
    else
    {
      asti = previous;
    }
  }

  Serial.println("[" + name + "] - Returning");

  return asti;
}

String HangTimerSystem::getFinalResult()
{
  return (String)(finalResult * -1) + " kg";
}

int HangTimerSystem::getPollingInterval() { return 1000; }

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
