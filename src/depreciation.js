export default (rrp, rv, operatingLife, writeOffMonths, age = 0) => {
  const depnInWriteOffPeriod = rv / writeOffMonths;
  // linear
  // const k = 2 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**2;
  // parabolic
  // const k = 3 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**3;
  // cubic
  const k = 4 * ((rrp - rv) - (depnInWriteOffPeriod * (operatingLife - age))) / (operatingLife - age) ** 4;

  const byMonth = Array.from({
    length: (operatingLife - age + writeOffMonths + 1),
  }, (v, i) => {
    if (i === 0) return rrp;
    if (i <= (operatingLife - age)) {
      // linear
      // const y = k/2 * ((operatingLife - age)**2 - (i - (operatingLife - age))**2) + depnInWriteOffPeriod * i;
      // parabolic
      // const y = k/3 * ((operatingLife - age)**3 + (i - (operatingLife - age))**3) + depnInWriteOffPeriod * i;
      // cubic
      const y = (k / 4) * ((operatingLife - age) ** 4 - (i - (operatingLife - age)) ** 4) + depnInWriteOffPeriod * i;

      return rrp - y;
    }
    return rv - (depnInWriteOffPeriod * (i - (operatingLife - age)));
  });

  return byMonth;
};
