import moment from 'moment'

export const now = () => {
  return Math.floor(Date.now() / 1000)
}

const parseDate = date => {
  const dt = moment(date)
    .format('ddd D[/]MM H:mm')
    .replace('Mon', 'Lun')
    .replace('Tue', 'Mar')
    .replace('Wed', 'Mié')
    .replace('Thu', 'Jue')
    .replace('Fri', 'Vie')
    .replace('Sat', 'Sáb')
    .replace('Sun', 'Dom')
    .replace('January', 'Enero')
    .replace('February', 'Febrero')
    .replace('March', 'Marzo')
    .replace('April', 'Abril')
    .replace('May', 'Mayo')
    .replace('June', 'Junio')
    .replace('July', 'Julio')
    .replace('August', 'Agosto')
    .replace('September', 'Septiembre')
    .replace('October', 'Octubre')
    .replace('November', 'Noviembre')
    .replace('December', 'Diciembre')
  return dt
}

export default parseDate
