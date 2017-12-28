import _ from 'lodash';

export default function (
  from,
  to,
  startingMonth,
  term,
  costOfFunds,
  distributionBase = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
) {
  const PVOfValueAtTerm = to / (1 + costOfFunds / 12) ** (term);
  const PVDifference = from - PVOfValueAtTerm;

  const longDistribution = _.flatten(Array(Math.ceil(term / 12) + 1).fill(distributionBase));
  const distributionCoefficientsAreValid = distributionBase.every(_.isNumber) &&
    _.max(distributionBase) === 1 &&
    _.min(distributionBase) >= 0;

  if (!distributionCoefficientsAreValid) {
    throw new Error(`
      The distribution array provided has invalid entries
    `);
  }

  const distributionBaseIsValid = Array.from({ length: 12 }, (v, i) => i).every(i => (
    _.sum(longDistribution.slice(i, i + 6)) >= 3 &&
    _.sum(longDistribution.slice(i, i + 12)) >= 9
  ));

  if (!distributionBaseIsValid) {
    throw new Error(`
      You have too many months with reduced payments, or they are too bunched
      together. Please edit your payment schedule.
    `);
  }

  const exactDistribution = longDistribution.slice(startingMonth, startingMonth + term);

  exactDistribution[0] = 1; // must pay the full payment on the originating month
  const ratePlusOne = 1 + costOfFunds / 12;
  const basePayment = PVDifference / (_.sum(exactDistribution
    .map((k, i) => k / Math.pow(ratePlusOne, i))));
  const payments = exactDistribution.map(k => (k * basePayment));
  const amortisation = payments.reduce((amort, pmt, i) => {
    if (i === 0) {
      amort.push(from - pmt);
    } else {
      amort.push(_.last(amort) * ratePlusOne - pmt);
    }
    return amort;
  }, []);
  const balances = amortisation.map((a, i) => a + payments[i]);

  return {
    balances,
    payments,
  };
}
