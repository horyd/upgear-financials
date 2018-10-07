import depreciationSchedule from '../src/depreciation';
import { expect } from 'chai';

describe('Depreciation Schedule', function () {
  it('computes a basic depreciation', function (done) {
    const rrp = 10000;
    const rv = 2000;
    const operatingLife = 36;
    const writeOffMonths = 24;
    const depreciationPower = 2;
    const basicDepn = depreciationSchedule(rrp, rv, depreciationPower, operatingLife, writeOffMonths);
    console.log(basicDepn);
    expect(basicDepn[0]).to.equal(rrp);
    expect(basicDepn[operatingLife]).to.equal(rv);
    expect(basicDepn[operatingLife + writeOffMonths]).to.equal(0);
    done();
  });

  it('computes a depreciation schedule for an aged asset', function (done) {
    const rrp = 10000;
    const rv = 2000;
    const operatingLife = 36;
    const writeOffMonths = 24;
    const depreciationPower = 2;
    const age = 12;
    const basicDepn = depreciationSchedule(rrp, rv, depreciationPower, operatingLife, writeOffMonths, age);
    console.log(basicDepn);
    expect(basicDepn[operatingLife - age]).to.equal(rv);
    expect(basicDepn[operatingLife + writeOffMonths - age]).to.equal(0);
    done();
  });
});
