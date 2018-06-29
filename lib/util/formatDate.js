module.exports =  function (day) {
  const year = day.getFullYear()
  const month = day.getMonth()
  const date = day.getDate()

  return `${year}-${month}-${date}`
}
