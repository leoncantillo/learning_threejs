const planetaryData = {
  sun: {
    radius: 6.9634,
    distance: 0,
    eccentricity: 0,
    color: "#ffff00",
    emissiveColor: "#ffaa00",
    orbitalPeriod: 0
  },
  mercury: {
    radius: 0.0244,
    distance: 5.79,
    eccentricity: 0.206,
    color: "#b1b1b1",
    emissiveColor: "#2a2a2a",
    orbitalPeriod: 87.97,
    initialAngle: 4.79965544 // 275°
  },
  venus: {
    radius: 0.0605,
    distance: 10.82,
    eccentricity: 0.007,
    color: "#e5c27e",
    emissiveColor: "#552222",
    orbitalPeriod: 224.7,
    initialAngle: 5.82008499 // 334°
  },
  earth: {
    radius: 0.0637,
    distance: 14.96,
    eccentricity: 0.017,
    color: "#2a6aff",
    emissiveColor: "#444444",
    orbitalPeriod: 365.25,
    initialAngle: 1.74532925 // 100°
  },
  mars: {
    radius: 0.0339,
    distance: 22.79,
    eccentricity: 0.093,
    color: "#c1440e",
    emissiveColor: "#3b1f1f",
    orbitalPeriod: 686.98,
    initialAngle: 0.71558499 // 41°
  },
  jupiter: {
    radius: 0.69911,
    distance: 77.83,
    eccentricity: 0.049,
    color: "#d2b48c",
    emissiveColor: "#663311",
    orbitalPeriod: 4332.59,
    initialAngle: 0.43633231 // 25°
  },
  saturn: {
    radius: 0.5823,
    distance: 142.7,
    eccentricity: 0.056,
    color: "#f5deb3",
    emissiveColor: "#554422",
    orbitalPeriod: 10759.22,
    initialAngle: 6.088 // 349°
  },
  uranus: {
    radius: 0.2536,
    distance: 287.1,
    eccentricity: 0.046,
    color: "#7fffd4",
    emissiveColor: "#334455",
    orbitalPeriod: 30688.5,
    initialAngle: 1.36135682 // 78°
  },
  neptune: {
    radius: 0.2462,
    distance: 449.8,
    eccentricity: 0.010,
    color: "#4169e1",
    emissiveColor: "#223355",
    orbitalPeriod: 60182,
    initialAngle: 6.24827872 // 358°
  },
  pluto: {
    radius: 0.0119,
    distance: 590.64,
    eccentricity: 0.248,
    color: "#dcdcdc",
    emissiveColor: "#1a1a1a",
    orbitalPeriod: 90560, // aproximadamente 248 años
    initialAngle: 5.113815 // 293°
  }
};

export default planetaryData;
