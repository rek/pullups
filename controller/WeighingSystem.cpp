/*
* WeighingSystem
*/

#include "Arduino.h"
#include "WeighingSystem.h"

void WeighingSystem::start()
{
  isRunning = true;
  startTime = millis();
}
