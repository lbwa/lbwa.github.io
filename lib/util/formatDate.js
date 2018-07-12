//! Notice: This module has been deprecated, and used to backup-using
// only associate with `lib/genMenu.js` from now on

module.exports =  function (day) {
  const year = day.getFullYear()
  const month = day.getMonth() + 1
  const date = day.getDate()

  return `${year}-${month}-${date}`
}
