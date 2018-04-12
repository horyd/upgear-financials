export default (rrp, rv, depreciationPower, operatingLife, writeOffMonths, age = 0) => {
  const depnInWriteOffPeriod = rv / writeOffMonths;

  // linear
  // const k = 2 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**2;
  // parabolic
  // const k = 3 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**3;
  // n-ic
  const k = depreciationPower * (
    (rrp - rv) - (depnInWriteOffPeriod * (operatingLife - age))
  ) / (operatingLife - age) ** depreciationPower;

  const byMonth = Array.from({
    length: (operatingLife - age + writeOffMonths + 1),
  }, (v, i) => {
    if (i === 0) return rrp;
    if (i <= (operatingLife - age)) {
      // linear
      // const y = k/2 * ((operatingLife - age)**2 - (i - (operatingLife - age))**2) + depnInWriteOffPeriod * i;
      // parabolic
      // const y = k/3 * ((operatingLife - age)**3 + (i - (operatingLife - age))**3) + depnInWriteOffPeriod * i;
      // n-ic
      const y = (k / depreciationPower) * (
        (operatingLife - age) ** depreciationPower - (i - (operatingLife - age)) ** depreciationPower
      ) + depnInWriteOffPeriod * i;

      return rrp - y;
    }
    return rv - (depnInWriteOffPeriod * (i - (operatingLife - age)));
  });

  return byMonth;
};
