const axios = require('axios');

function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

async function isHoliday(date) {
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const holidaysUrl = `${process.env.HOLIDAYS_API}/${yy}/${mm}/${dd}`;
  const response = await axios.get(holidaysUrl);
  return response.data && !response.data.error;
}

async function checkCurrentDate() {
  const currentDate = new Date();
  const isWeekend = !isWeekday(currentDate);
  const isPublicHoliday = await isHoliday(currentDate);

  console.log({
    'Weekend': isWeekend,
    'Holiday': isPublicHoliday
  });

  if (isWeekend || isPublicHoliday) {
    throw new Error('The current day is not punchable');
  }
}

module.exports = checkCurrentDate;
