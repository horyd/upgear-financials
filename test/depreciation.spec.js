import depreciationSchedule from '../src/depreciation';
import { expect } from 'chai';

describe('Depreciation Schedule', function () {
  it('computes a basic depreciation', function (done) {
    const rrp = 3000;
    const rv = 600;
    const operatingLife = 48;
    const writeOffMonths = 36;
    const basicDepn = depreciationSchedule(rrp, rv, operatingLife, writeOffMonths);

    expect(basicDepn[0]).to.equal(rrp);
    expect(basicDepn[operatingLife]).to.equal(rv);
    expect(basicDepn[operatingLife + writeOffMonths]).to.equal(0);
    done();
  });
});
