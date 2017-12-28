import _ from 'lodash';

function capitalisedOriginationFee(fee, term, rate) {
  return (rate / 12 * fee) / (1 - (1 + rate / 12) ** -term) * (1 / (1 + rate / 12));
}

function capitalisedFutureDisposalFee(fee, term, rate) {
  return (fee * rate / 12) * (1 / (((1 + rate / 12) ** term) - 1)) * (1 / (1 + rate / 12));
}

export function disposalSchedule(fee, term, rate) {
  const ratePlusOne = 1 + rate / 12;
  const payment = capitalisedFutureDisposalFee(fee, term, rate);
  const accumulation = Array.from({ length: term }, () => payment).reduce((amort, pmt, i) => {
    if (i === 0) {
      amort.push(pmt);
    } else {
      amort.push(_.last(amort) * ratePlusOne + pmt);
    }
    return amort;
  }, []);
  const balances = accumulation.map((a, i) => a - payment);

  return {
    balances,
    payment,
  };
}

export function originationSchedule(fee, term, rate) {
  const ratePlusOne = 1 + rate / 12;
  const payment = capitalisedOriginationFee(fee, term, rate);
  const amortisation = Array.from({ length: term }, () => payment).reduce((amort, pmt, i) => {
    if (i === 0) {
      amort.push(fee - pmt);
    } else {
      amort.push(_.last(amort) * ratePlusOne - pmt);
    }
    return amort;
  }, []);
  const balances = amortisation.map((a, i) => a + payment);

  return {
    balances,
    payment,
  };
}
