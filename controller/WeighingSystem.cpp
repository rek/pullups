#include <Arduino.h>
#include "WeighingSystem.h"

float WeighingSystem::addTime(float weight)
{
  Serial.print("Adding weight: ");
  Serial.println(weight);

  if ((int)weight == 0)
  {
    // has not started hanging yet
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

  Serial.println(" - Returning");

  return asti;
}

int WeighingSystem::getPollingInterval() { return 1000; }

String WeighingSystem::getFinalResult()
{
  return (String)finalResult + " kg";
}

void WeighingSystem::reset()
{
  baseReset();
  
  asti = -1;
  previous = 0;
}

void WeighingSystem::stop()
{
  baseStop();

  finalResult = previous;
  hangDuration = stopTime - startTime;
}
