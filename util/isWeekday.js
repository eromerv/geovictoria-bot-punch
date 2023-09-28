// Validate if the current date is a weekday (Monday to Friday)
function isWeekday() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

module.exports = isWeekday