# Pullup analysis system - Admin (React)

## Local dev

This package uses `detect-pullups` from the local repo, but this is not setup as a monorepo

So you have to link it manually to use a dev version

## TODO:

- [ ] see all processing results
- [ ] delete processing results?
- [ ] overlay report onto log
- [ ] when generating report, also update: total count? processed: false
- [x] set active user
- [x] show active user
- [ ] react grid layout to show multi something?
- [x] make expo app
- [ ] firebase hosting of a stats page?
- [x] mobile view designs
- [ ] process up part of pullup for stats
- [ ] make reports management page

## Analysis:

impulse momentum theorem as follows:
F = m \* (vf –v0) / t

The propulsive phase of each repetition as the part of the concentric phase in which measured acceleration was higher than g (i.e. a > 9.81 m/s2)

F is MPF (in N)
m the system mass (i.e. body mass plus external load, in kg)
vf is the final velocity of the propulsive phase (in m/s)
v0 is the initial propulsive velocity of the concentric phase (in m/s)
t is the duration of the propulsive phase (in s)
MPP was computed as the product of MPF and MPV: MPP = MPF \* MPV

## Process

- Action is taken in the real world
- A log is recorded on the hardware and sent to firestore `logs`
- Firebase functions adds a `created` date to the `logs` record
- Firebase functions updated `weight` of `user` in `users`
- Firebase functions adds `processedLogs` report
-
