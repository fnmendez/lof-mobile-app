const retryFunction = async (func, params, triesLeft) => {
  try {
    const ret = await func(...params)
    return ret
  } catch (err) {
    if (triesLeft) return retryFunction(func, params, --triesLeft)
    return Promise.reject(err)
  }
}

export default retryFunction
