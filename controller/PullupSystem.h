/*
* PullupSystem
*/
#include "BaseSystem.h"

class PullupSystem : public BaseSystem
{
public:
  bool inactive = false;
  unsigned long inactiveStartTime;

  // from baseSystem
  int getPollingInterval();
  float addTime(float weight);
  void stop();
  void reset();
};
