const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export default async function sleep(fn, ms) {
  await timeout(ms)
  return fn()
}
