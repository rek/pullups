#include "Arduino.h"
#include "HangTimerSystem.h"

int HangTimerSystem::addTime(int weight)
{
  //    Serial.print("Adding weight: ");
  //    Serial.println(weight);

  if (weight == 0)
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
    if (previous == asti)
    {
      asti = 0;
      stop();
      Serial.println(" - Stopping");
    }
    else
    {
      asti = previous;
    }
  }

  Serial.println(" - Returning");

  return asti;
}

void HangTimerSystem::start()
{
  // clear any previous run information
  reset();
  isRunning = true;
  startTime = millis();
  Serial.println("[HangTimer] - Running start");
}

void HangTimerSystem::reset()
{
  startTime = 0;
  stopTime = 0;
  asti = -1;
  previous = 0;
  isRunning = false;
  hasStarted = false;
  Serial.println("[HangTimer] - Running reset");
}

void HangTimerSystem::stop()
{
  Serial.println("[HangTimer] - Running stop");
  finalResult = previous;
  stopTime = millis();
  hangDuration = stopTime - startTime;
  isRunning = false;
}
