const strToHexArr = str => str.match(/.{1,2}/g).map(v => Number(`0x${v}`))

export default strToHexArr
