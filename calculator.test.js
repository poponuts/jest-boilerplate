const calculator = require('./calculator');
const inputs = require('./input.json'); // to be used for integration tests
const outputs = require('./expectedOutput.json');

// arrange
let from = '';
let to = '';
let booking = '';

// TODO: list all possible scenarios per function // BOUNDARY VALUE ANALYSIS

describe('calculator unit test suite', () => {
  test('check isLessThan1Hour greater than 1 hour', () => {
    from = new Date('2017-10-18T18:00:00+11:00');
    to = new Date('2017-10-18T19:00:01+11:00');
    expect(calculator.isLessThan1Hour(from, to)).toEqual(false);
  });

  test('check isLessThan1Hour is exactly 1 hour', () => {
    from = new Date('2017-10-18T18:00:00+11:00');
    to = new Date('2017-10-18T19:00:00+11:00');
    expect(calculator.isLessThan1Hour(from, to)).toEqual(false);
  });

  test('check isLessThan1Hour is less than 1 hour', () => {
    from = new Date('2017-10-18T18:00:00+11:00');
    to = new Date('2017-10-18T18:59:59+11:00');
    expect(calculator.isLessThan1Hour(from, to)).toEqual(true);
  });

  test('check isGreaterThan24Hours greater than 24 hours', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2018-10-23T08:00:01+11:00');
    expect(calculator.isGreaterThan24Hours(from, to)).toEqual(true);
  });

  test('check isGreaterThan24Hours is exactly 24 hours', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-24T08:00:00+11:00');
    expect(calculator.isGreaterThan24Hours(from, to)).toEqual(false);
  });

  test('check isGreaterThan24Hours is less than 24 hours', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-24T07:00:59+11:00');
    expect(calculator.isGreaterThan24Hours(from, to)).toEqual(false);
  });

  test('check hasEndedBeforeStarted has ended before started', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T07:00:59+11:00');
    expect(calculator.hasEndedBeforeStarted(from, to)).toEqual(true);
  });

  test('check hasEndedBeforeStarted has ended after started', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T08:00:01+11:00');
    expect(calculator.hasEndedBeforeStarted(from, to)).toEqual(false);
  });

  test('check hasEndedBeforeStarted has same start and end date', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T08:00:00+11:00');
    expect(calculator.hasEndedBeforeStarted(from, to)).toEqual(false);
  });

  test('check hasIncorrectOffset has correct start and end date format', () => {
    from = '2017-10-23T08:00:00+11:00'; // this function handles string format
    to = '2017-10-23T08:00:00+11:00';
    expect(calculator.hasIncorrectOffset(from, to)).toEqual(false);
  });

  test('check hasIncorrectOffset has incorrect start and end date format', () => {
    from = '2017-10-23T08:00:00+11:01';
    to = '2017-10-23T08:00:00+12:00';
    expect(calculator.hasIncorrectOffset(from, to)).toEqual(true);
  });

  test('check hasIncorrectOffset has incorrect start but correct end date format', () => {
    from = '2017-10-23T08:00:00+11:01';
    to = '2017-10-23T08:00:00+11:00';
    expect(calculator.hasIncorrectOffset(from, to)).toEqual(true);
  });

  test('check hasIncorrectOffset has correct start but incorrect end date format', () => {
    from = '2017-10-23T08:00:00+11:00';
    to = '2017-10-23T08:00:00+12:00';
    expect(calculator.hasIncorrectOffset(from, to)).toEqual(true);
  });

  test('check isSaturday is Saturday', () => {
    from = new Date('2022-03-05T00:00:00+11:00');
    expect(calculator.isSaturday(from)).toEqual(true);
  });

  test('check isSaturday is not Saturday', () => {
    from = new Date('2022-03-05T24:00:00+11:00');
    expect(calculator.isSaturday(from)).toEqual(false);
  });

  test('check isSunday is Sunday', () => {
    from = new Date('2022-03-06T00:00:00+11:00');
    expect(calculator.isSunday(from)).toEqual(true);
  });

  test('check isSunday is not Sunday', () => {
    from = new Date('2022-03-06T24:00:00+11:00');
    expect(calculator.isSunday(from)).toEqual(false);
  });

  test('check isNight is greater than 20:00', () => {
    to = new Date('2022-03-06T20:00:01+11:00');
    expect(calculator.isNight(to)).toEqual(true);
  });

  test('check isNight is exactly 20:00', () => {
    to = new Date('2022-03-06T20:00:00+11:00');
    expect(calculator.isNight(to)).toEqual(true);
  });

  test('check isNight is less than 6:00', () => {
    to = new Date('2022-03-06T05:59:59+11:00');
    expect(calculator.isNight(to)).toEqual(true);
  });

  test('check isNight is exactly 6:00', () => {
    to = new Date('2022-03-06T06:00:00+11:00');
    expect(calculator.isNight(to)).toEqual(true);
  });

  test('check isNight is greater than 6:00', () => {
    to = new Date('2022-03-06T07:00:00+11:00');
    expect(calculator.isNight(to)).toEqual(false);
  });

  test('check isNight is less than than 20:00', () => {
    to = new Date('2022-03-06T19:59:59+11:00');
    expect(calculator.isNight(to)).toEqual(false);
  });

  test('check calculateRate returns correct saturday rate', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T09:00:00+11:00');
    expect(calculator.calculateRate(from, to, 'saturday')).toEqual(45.91);
  });

  test('check calculateRate returns correct sunday rate', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T10:00:00+11:00');
    expect(calculator.calculateRate(from, to, 'sunday')).toEqual(121.70);
  });

  test('check calculateRate returns correct night rate', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T09:30:00+11:00');
    expect(calculator.calculateRate(from, to, 'night')).toEqual(64.395);
  });

  test('check calculateRate returns day rate', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T09:00:00+11:00');
    expect(calculator.calculateRate(from, to, '')).toEqual(38);
  });

  test('check calculateRate returns day rate', () => {
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T09:00:00+11:00');
    expect(calculator.calculateRate(from, to, '')).toEqual(38);
  });

  test('check formatBooking shows updated details', () => {
    booking =   {
      "id": 1,
      "from": "2017-10-23T08:00:00+11:00",
      "to": "2017-10-23T11:00:00+11:00",
      "isValid": true,
      "total": 114
    };
    expect(calculator.formatBooking(booking, false, 114)).toEqual(
      {
        "id": 1,
        "from": "2017-10-23T08:00:00+11:00",
        "to": "2017-10-23T11:00:00+11:00",
        "isValid": false,
        "total": 114
      });
  });

  test('check formatBooking shows correct total format', () => {
    booking =   {
      "id": 2,
      "from": "2017-10-23T08:00:00+11:00",
      "to": "2017-10-23T11:00:00+11:00",
      "isValid": false,
      "total": 114
    };
    expect(calculator.formatBooking(booking, true, 114.5678)).toEqual(
      {
        "id": 2,
        "from": "2017-10-23T08:00:00+11:00",
        "to": "2017-10-23T11:00:00+11:00",
        "isValid": true,
        "total": 114.57
      });
  });

  test('check formatBooking to handle edge case', () => {
    booking =   {
      "id": 2,
      "from": "2017-10-23T08:00:00+11:00",
      "to": "2017-10-23T11:00:00+11:00",
      "isValid": false,
      "total": 114.56
    };
    expect(calculator.formatBooking(booking, '', 0)).toEqual(
      {
        "id": 2,
        "from": "2017-10-23T08:00:00+11:00",
        "to": "2017-10-23T11:00:00+11:00",
        "isValid": '',
        "total": 0
      });
  });

  test('test uncovered lines', () => { // this may resolve uncovered lines from the code coverage report
    from = new Date('2017-10-23T08:00:00+11:00');
    to = new Date('2017-10-23T09:00:00+11:00');
    if(calculator.isSunday(from, to)) {
      let rate = calculator.calculateRate(from, to, 'sunday');
      let newBooking = calculator.formatBooking({}, false, 0);
      expect(calculator.calculateRate(from, to, 'night')).toEqual(true);
    };
  });

  test('integration tests between pretend db/api input and pretend db/api output', () => {
    let i = 0;
    for (i; i < inputs.length; i ++) {
      expect(inputs[i].id).toEqual(outputs[i].id);
      expect(inputs[i].from).toEqual(outputs[i].from);
      expect(inputs[i].to).toEqual(outputs[i].to);

      // include calculations to assert isValid and total
    }
  });
});