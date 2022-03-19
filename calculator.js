const input = require('./input.json');
const expectedOutput = require('./expectedOutput.json');

// Approach
// - Loop through all input bookings.
// - Discard any bookings that don't meet the business rules.
// - Add remaining valid bookings to new output array.

const hourInMilliseconds = 60 * 60 * 1000;
const saturdayRate = 45.91;
const sundayRate = 60.85;
const nightRate = 42.93;
const dayRate = 38;
let rate = '';

(() => {
  const output = input.reduce((acc, booking) => {
    let newBooking = { ...booking };

    if (hasIncorrectOffset(booking.from, booking.to)) {
      acc.push(formatBooking(newBooking));
      return acc;
    }

    const from = new Date(newBooking.from);
    const to = new Date(newBooking.to);

    if (isLessThan1Hour(from, to)) {
      acc.push(formatBooking(newBooking));
      return acc;
    }

    if (isGreaterThan24Hours(from, to)) {
      acc.push(formatBooking(newBooking));
      return acc;
    }

    if (hasEndedBeforeStarted(from, to)) {
      acc.push(formatBooking(newBooking));
      return acc;
    }

    if (isSaturday(from, to)) { // TODO: can use SWITCH too
      rate = calculateRate(from, to, 'saturday');
      newBooking = formatBooking(newBooking, true, rate);
    } else if (isSunday(from, to)) {
      rate = calculateRate(from, to, 'sunday');
      newBooking = formatBooking(newBooking, true, rate);
    } else if (isNight(to)) {
      rate = calculateRate(from, to, 'night');
      newBooking = formatBooking(newBooking, true, rate);
    } else {
      rate = calculateRate(from, to);
      newBooking = formatBooking(newBooking, true, rate);
    }

    // Booking is valid at this point, lets return it.
    acc.push(newBooking);

    return acc;
  }, []);

  console.log('RESULT', JSON.stringify(output) === JSON.stringify(expectedOutput));
})();

function isLessThan1Hour(from, to) {
  const diff = Math.abs(from - to);
  return diff < hourInMilliseconds;
}

function isGreaterThan24Hours(from, to) {
  const diff = Math.abs(from - to);
  return diff > (hourInMilliseconds * 24);
}

function hasEndedBeforeStarted(from, to) {
  return to < from;
}

function hasIncorrectOffset(from, to) {
  if (!from.includes('+11:00')) return true;
  if (!to.includes('+11:00')) return true;
  return false;
}

function isSaturday(from) {
  if (from.getDay() === 6) return true;
  return false;
}

function isSunday(from) {
  if (from.getDay() === 0) return true;
  return false;
}

function isNight(to) {
  const toNight = to.getHours();
  if (toNight >= 20) return true;
  if (toNight <= 6) return true;
  return false;
}

function calculateRate(from, to, type) {
  const diff = Math.abs(from - to);
  const hours = diff / hourInMilliseconds;

  if (type == 'saturday') return hours * saturdayRate;
  if (type == 'sunday') return hours * sundayRate;
  if (type == 'night') return hours * nightRate;
  // TODO: include error handling / else

  return hours * dayRate;
}

function formatBooking(booking, isValid = false, total = 0) {
  return {
    ...booking,
    isValid,
    total: parseFloat(total.toFixed(2))
  };
}

module.exports = {
  isLessThan1Hour, isGreaterThan24Hours, hasEndedBeforeStarted, hasIncorrectOffset, isSaturday, isSunday, isNight, calculateRate, formatBooking
};
