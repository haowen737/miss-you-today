const Utils = {}

Utils.DateFormat = function (time, format) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() + 1
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return format
    .replace('YYYY', year)
    .replace('MM', adjustDateLength(month))
    .replace('DD', adjustDateLength(day))
    .replace('hh', adjustDateLength(hour))
    .replace('mm', adjustDateLength(minutes))
    .replace('ss', adjustDateLength(seconds))
}

function adjustDateLength (target) {
  return target > 10 ? target : target.toString().concat('0').split('').reverse().join('')
}

export default Utils