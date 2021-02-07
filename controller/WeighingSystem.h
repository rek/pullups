/*
* WeighingSystem
*
* - Start timer
* - if max
* - on increment - add weight
* - check if min increment's are added
* - if we have enough data - check variation
* - if stable -> stop loop
*/
#include "BaseSystem.h"

class WeighingSystem : public BaseSystem
{
public:
  int hangDuration;
  unsigned long startTime;
  unsigned long stopTime;
  String getFinalResult();

  float asti;
  float finalResult;
  float previous;

  // from baseSystem
  int getPollingInterval();
  float addTime(float weight);
  void stop();
  void reset();
};
