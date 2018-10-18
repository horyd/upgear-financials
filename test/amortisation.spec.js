import amortisationSchedule from '../src/amortisation';

describe.only('Amortisation Schedule', function () {
  it('computes a basic amort', function (done) {
    const basicAmort = amortisationSchedule(3000, 1000, 4, 36, 0.1, [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);

    console.log(basicAmort);
    console.log(basicAmort.payments.length);
    done();
  });
});
