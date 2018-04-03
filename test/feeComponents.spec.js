import { originationSchedule, disposalSchedule } from '../src/feeComponents';
import { expect } from 'chai';

describe('Fee Schedules', function () {
  it('computes an origination schedule', function (done) {
    const fee = 300;
    const term = 36;
    const rate = 0.1;
    const originations = originationSchedule(fee, term, rate);

    expect(
      originations.balances[originations.balances.length - 2] * (1 + rate / 12) - originations.payment
    ).to.be.closeTo(0, fee / 3000, 'Origination fee did not amortise correctly.');
    expect(originations.balances[0]).to.equal(fee);
    expect(originations.balances.length).to.equal(term + 1);
    done();
  });
  it('computes a disposal schedule', function (done) {
    const fee = 150;
    const term = 36;
    const rate = 0.1;
    const disposals = disposalSchedule(fee, term, rate);

    expect(
      disposals.balances[disposals.balances.length - 2] * (1 + rate / 12) + disposals.payment
    ).to.be.closeTo(fee, fee / 3000, 'Disposal balance did not add to fee.');
    expect(disposals.balances[0]).to.equal(0);
    expect(disposals.balances.length).to.equal(term + 1);
    done();
  });
});
