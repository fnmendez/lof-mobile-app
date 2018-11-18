import moment from 'moment'

export const now = () => {
  return Math.floor(Date.now() / 1000)
}

export const toSeconds = date => {
  const d = new Date(date)
  return Math.floor(d.getTime() / 1000)
}

export const minsAndSecs = time => {
  const seconds = String(time % 60).padStart(2, '0')
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export const minsAndSecsLetters = time => {
  const seconds = String(time % 60).padStart(2, '0')
  const minutes = String(Math.floor(time / 60))
  return `${minutes} M ${seconds} S`
}

export const secsDiff = (start, end) => {
  const s = Math.floor(new Date(start).getTime() / 1000)
  const e = Math.floor(new Date(end).getTime() / 1000)
  return e - s
}

const parseDate = (date, mode) => {
  const dt = moment(date).format(mode === 'onlyTime' ? 'HH:mm' : 'D[/]MM[/]YY')
  return dt
}

export default parseDate
