import isAndroid from '../helpers/platform'

const colors = {
  SeaBuckthorn: '#f8b133',
  Punch: '#d34322',
  HalfBaked: '#83c9c5',
  PuertoRico: '#44b7af',
  Lochinvar: '#36938a',
  Mirage: '#141625',
  LilacBush: '#a87dd3',
  PurpleHeart: '#6432b2',
  BG: '#a1a1a1',
  DG: '#303030',
  G: '#5a565c',
  PW: '#ebebeb',
  White: '#fff',
}

export const logoSmall = { height: 120, width: 120 }

export const logoMedium = { width: 160, height: 160 }

export const logoLarge = { height: 300, width: 300 }

export const mainContainerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.PuertoRico,
}

export const buttonStyle = {
  marginTop: 15,
  width: isAndroid ? 270 : 250,
  borderRadius: 8,
  paddingVertical: 10,
}

export default colors
