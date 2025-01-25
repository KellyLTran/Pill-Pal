
const fiveHourMap = new Map();
fiveHourMap.set('0', 0.0);   // At 0 minutes, activation is 0
fiveHourMap.set('30', 0.2);  // At 30 minutes, activation is 0.2
fiveHourMap.set('60', 0.5);  // At 60 minutes, activation is 0.5
fiveHourMap.set('90', 0.7);  // At 90 minutes, activation is 0.7
fiveHourMap.set('120', 0.9); // At 120 minutes, activation is 0.9 (peak)
fiveHourMap.set('150', 0.8); // At 150 minutes, activation is 0.8
fiveHourMap.set('180', 0.7); // At 180 minutes, activation is 0.7
fiveHourMap.set('210', 0.5); // At 210 minutes, activation is 0.5
fiveHourMap.set('240', 0.3); // At 240 minutes, activation is 0.3
fiveHourMap.set('270', 0.1); // At 270 minutes, activation is 0.1
fiveHourMap.set('300', 0.0); // At 300 minutes, activation is 0.0

const tenHourMap = new Map();
tenHourMap.set('0', 0.0);    // At 0 minutes, activation is 0
tenHourMap.set('60', 0.1);   // At 60 minutes, activation is 0.1
tenHourMap.set('120', 0.3);  // At 120 minutes, activation is 0.3
tenHourMap.set('180', 0.5);  // At 180 minutes, activation is 0.5
tenHourMap.set('240', 0.8);  // At 240 minutes, activation is 0.8 (peak)
tenHourMap.set('300', 0.7);  // At 300 minutes, activation is 0.7
tenHourMap.set('360', 0.6);  // At 360 minutes, activation is 0.6
tenHourMap.set('420', 0.5);  // At 420 minutes, activation is 0.5
tenHourMap.set('480', 0.4);  // At 480 minutes, activation is 0.4
tenHourMap.set('540', 0.2);  // At 540 minutes, activation is 0.2
tenHourMap.set('600', 0.0);  // At 600 minutes, activation is 0.0


export const medications = [
  {
    name: '5-Hour Medication',
    dosage: 10, // Dosage in milligrams (mg)
    release: 'IR', // Immediate Release
    sleep_m: 300, // time min till sleep
    concentration_map: fiveHourMap, // Activation levels over time
  },
  {
    name: '10 hour medication',
    dosage: 25,
    release: 'EX',
    sleep_m: 840,
    concentration_map: tenHourMap,
  },
];


