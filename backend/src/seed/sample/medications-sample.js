const adderallXR20MgDextroMap = new Map();
adderallXR20MgDextroMap.set('0', 0.0);
adderallXR20MgDextroMap.set('60', 0.25);
adderallXR20MgDextroMap.set('120', 0.5);
adderallXR20MgDextroMap.set('180', 0.7);
adderallXR20MgDextroMap.set('240', 0.9);
adderallXR20MgDextroMap.set('300', 0.95);
adderallXR20MgDextroMap.set('360', 1.0);
adderallXR20MgDextroMap.set('420', 0.95);
adderallXR20MgDextroMap.set('480', 0.85);
adderallXR20MgDextroMap.set('600', 0.72);
adderallXR20MgDextroMap.set('720', 0.60);
adderallXR20MgDextroMap.set('840', 0.48);
adderallXR20MgDextroMap.set('960', 0.33);
adderallXR20MgDextroMap.set('1080', 0.22);
adderallXR20MgDextroMap.set('1200', 0.11);
adderallXR20MgDextroMap.set('1320', 0.08);
adderallXR20MgDextroMap.set('1440', 0.06);

const adderall10MgBidDextroMap = new Map();
adderall10MgBidDextroMap.set('0', 0.0);
adderall10MgBidDextroMap.set('60', 0.22);
adderall10MgBidDextroMap.set('120', 0.44);
adderall10MgBidDextroMap.set('180', 0.67);
adderall10MgBidDextroMap.set('240', 0.89);
adderall10MgBidDextroMap.set('300', 0.94);
adderall10MgBidDextroMap.set('360', 1.0);
adderall10MgBidDextroMap.set('420', 0.89);
adderall10MgBidDextroMap.set('480', 0.78);
adderall10MgBidDextroMap.set('600', 0.72);
adderall10MgBidDextroMap.set('720', 0.67);
adderall10MgBidDextroMap.set('840', 0.61);
adderall10MgBidDextroMap.set('960', 0.56);
adderall10MgBidDextroMap.set('1080', 0.39);
adderall10MgBidDextroMap.set('1200', 0.22);
adderall10MgBidDextroMap.set('1320', 0.16);
adderall10MgBidDextroMap.set('1440', 0.11);

const adderallXR20MgLevoMap = new Map();
adderallXR20MgLevoMap.set('0', 0.0);
adderallXR20MgLevoMap.set('60', 0.20);
adderallXR20MgLevoMap.set('120', 0.40);
adderallXR20MgLevoMap.set('180', 0.60);
adderallXR20MgLevoMap.set('240', 0.80);
adderallXR20MgLevoMap.set('300', 0.90);
adderallXR20MgLevoMap.set('360', 1.0);
adderallXR20MgLevoMap.set('420', 0.95);
adderallXR20MgLevoMap.set('480', 0.90);
adderallXR20MgLevoMap.set('600', 0.80);
adderallXR20MgLevoMap.set('720', 0.70);
adderallXR20MgLevoMap.set('840', 0.55);
adderallXR20MgLevoMap.set('960', 0.40);
adderallXR20MgLevoMap.set('1080', 0.30);
adderallXR20MgLevoMap.set('1200', 0.20);
adderallXR20MgLevoMap.set('1320', 0.15);
adderallXR20MgLevoMap.set('1440', 0.10);

const adderall10MgBidLevoMap = new Map();
adderall10MgBidLevoMap.set('0', 0.0);
adderall10MgBidLevoMap.set('60', 0.19);
adderall10MgBidLevoMap.set('120', 0.38);
adderall10MgBidLevoMap.set('180', 0.56);
adderall10MgBidLevoMap.set('240', 0.75);
adderall10MgBidLevoMap.set('300', 0.82);
adderall10MgBidLevoMap.set('360', 1.0);
adderall10MgBidLevoMap.set('420', 0.94);
adderall10MgBidLevoMap.set('480', 0.88);
adderall10MgBidLevoMap.set('600', 0.82);
adderall10MgBidLevoMap.set('720', 0.75);
adderall10MgBidLevoMap.set('840', 0.69);
adderall10MgBidLevoMap.set('960', 0.63);
adderall10MgBidLevoMap.set('1080', 0.50);
adderall10MgBidLevoMap.set('1200', 0.38);
adderall10MgBidLevoMap.set('1320', 0.26);
adderall10MgBidLevoMap.set('1440', 0.13);

export const medications = [
  {
    name: 'Adderall',
    dosage: 20, // Dosage in milligrams (mg)
    release: 'XR', // Extended Release
    sleep_m: 720, // Time in minutes till sleep
    concentration_map: adderallXR20MgDextroMap, // Activation levels over time
  },
  {
    name: 'Adderall',
    dosage: 10,
    release: 'IR', // Immediate Release
    sleep_m: 720,
    concentration_map: adderall10MgBidDextroMap,
  },
  {
    name: 'Adderall',
    dosage: 20,
    release: 'XR', // Extended Release
    sleep_m: 720,
    concentration_map: adderallXR20MgLevoMap,
  },
  {
    name: 'Adderall',
    dosage: 10,
    release: 'IR', // Immediate Release
    sleep_m: 720,
    concentration_map: adderall10MgBidLevoMap,
  },
];