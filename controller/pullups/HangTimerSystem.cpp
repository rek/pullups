#include "Arduino.h"
#include "HangTimerSystem.h"

void HangTimerSystem::addTime(int weight)
{
  if (isRunning == true)
  {
    previous = (previous + weight) / 2;

    if (previous == asti)
    {
      stop();
    }
    else
    {
      asti = previous;
    }
  }
}

void HangTimerSystem::start()
{
  isRunning = true;
  startTime = millis();
}

void HangTimerSystem::reset()
{
  startTime = 0;
  stopTime = 0;
  isRunning = false;
}

void HangTimerSystem::stop()
{
  finalResult = previous;
  stopTime = millis();
  hangDuration = stopTime - startTime;
  isRunning = false;
}
