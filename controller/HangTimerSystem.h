/*
* HangTimerSystem
*
* - Start timer
* - if max
* - on increment - add weight
* - check if min increment's are added
* - if we have enough data - check variation
* - if stable -> stop loop
*/
class HangTimerSystem
{
public:
  bool hasStarted = false;
  bool isRunning = false;

  unsigned long startTime;
  int hangDuration;
  unsigned long stopTime;
  int addTime(int weight);

  int asti;
  int finalResult;
  int previous;

  void start();

private:
  void stop();
  void reset();
};
