/*
* PullupSystem
*/
#include "BaseSystem.h"
#include <Vector.h>

class PullupSystem : public BaseSystem
{
public:
  bool inactive = false;
  unsigned long inactiveStartTime;

  Log getLastLog();

  // from baseSystem
  int getPollingInterval();
  float addTime(float weight);
  void stop();
  void reset();
};
