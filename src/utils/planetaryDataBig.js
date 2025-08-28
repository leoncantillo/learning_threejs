const planetaryData = {
  sun: {
    radius: 20,
    distance: 0,
    eccentricity: 0,
    color: "#ffff00",
    emissiveColor: "#ffaa00",
    orbitalPeriod: 0
  },
  mercury: {
    radius: 1.2,
    distance: 30,
    eccentricity: 0.206,
    color: "#b1b1b1",
    emissiveColor: "#2a2a2a",
    orbitalPeriod: 87.97,
    initialAngle: 4.79965544 // 275°
  },
  venus: {
    radius: 2.2,
    distance: 45,
    eccentricity: 0.007,
    color: "#e5c27e",
    emissiveColor: "#552222",
    orbitalPeriod: 224.7,
    initialAngle: 5.82008499 // 334°
  },
  earth: {
    radius: 2.3,
    distance: 60,
    eccentricity: 0.017,
    color: "#2a6aff",
    emissiveColor: "#444444",
    orbitalPeriod: 365.25,
    initialAngle: 1.74532925 // 100°
  },
  mars: {
    radius: 1.5,
    distance: 75,
    eccentricity: 0.093,
    color: "#c1440e",
    emissiveColor: "#3b1f1f",
    orbitalPeriod: 686.98,
    initialAngle: 0.71558499 // 41°
  },
  jupiter: {
    radius: 7,
    distance: 100,
    eccentricity: 0.049,
    color: "#d2b48c",
    emissiveColor: "#663311",
    orbitalPeriod: 4332.59,
    initialAngle: 0.43633231 // 25°
  },
  saturn: {
    radius: 6,
    distance: 125,
    eccentricity: 0.056,
    color: "#f5deb3",
    emissiveColor: "#554422",
    orbitalPeriod: 10759.22,
    initialAngle: 6.088 // 349°
  },
  uranus: {
    radius: 4,
    distance: 150,
    eccentricity: 0.046,
    color: "#7fffd4",
    emissiveColor: "#334455",
    orbitalPeriod: 30688.5,
    initialAngle: 1.36135682 // 78°
  },
  neptune: {
    radius: 4,
    distance: 175,
    eccentricity: 0.010,
    color: "#4169e1",
    emissiveColor: "#223355",
    orbitalPeriod: 60182,
    initialAngle: 6.24827872 // 358°
  },
  pluto: {
    radius: 0.8,
    distance: 200,
    eccentricity: 0.248,
    color: "#dcdcdc",
    emissiveColor: "#1a1a1a",
    orbitalPeriod: 90560, // aproximadamente 248 años
    initialAngle: 5.113815 // 293°
  }
};

export default planetaryData;
