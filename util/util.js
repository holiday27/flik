const moment = require('moment');

function getCurrentDate() {
  const now = moment();
  const formatted = now.format('YYYY-MM-DD HH:mm:ss');
  return formatted;
  // console.log('DATE: ', formatted);
}
// getCurrentDate();

// console.log(getCurrentDate());

module.exports = getCurrentDate;
