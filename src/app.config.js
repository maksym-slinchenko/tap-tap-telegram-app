module.exports = {
  activeBoosterTime: 5000, // Time in ms when booster is active
  inactiveBoosterTime: 55000, // Time in ms when booster is inactive
  firstRandomBoosterActivInterval: [5000, 60000], // Interval beetwen first random booster activation time
  boosterValue: 2, // Value of the booster
  scaleChangingSpeed: 5, // Speed of scaling when coin is appearing
  leftAnimationTime: 500, // Time in ms when coin is disappearing
  maxEnergy: 1000, // Maximum energy
  speedFactor: 3, // Coefficient to control the speed of the waves
  samePointDistance: 5, // Distance between points to be considered as the same
  controlTapNumber: 5, // Number of taps on the same point per second to cancel the click event
};
