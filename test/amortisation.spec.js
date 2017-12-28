import amortisationSchedule from '../src/amortisation';

describe('Amortisation Schedule', function () {
  it('computes a basic amort', function (done) {
    const basicAmort = amortisationSchedule(3000, 1000, 0, 36, 0.1);

    console.log(basicAmort);
    done();
  });
});
