


const cachedLogs = false // true will turn on all logs to the cache



const cleanup = (key, timeToCleanup, store) => {
  setTimeout(() => {
    cachedLogs && console.log('deleted from cache ', key, timeToCleanup)
    delete store[key]
  }, timeToCleanup)

}

const getKey = (options) => {
  // console.log(options)
  var key = options.url;
  if (options.params.product_id) {
    key += options.params.product_id
  }
  // console.log('new key', key)
  return key
}

const minute = 60 * 1000;
const baseTime = 2 * minute

const QuickCache = (maxStoreTime = baseTime) => {
  const instance = { maxStoreTime };
  instance.store = {}

  instance.add = (options, value) => {
    const key = getKey(options)
    const createdAt = Date.now()
    instance.store[key] = { value, createdAt }
    cachedLogs && console.log('added to cache ', key, instance.store)
    cleanup(key, instance.maxStoreTime, instance.store)
  }

  instance.check = (options, promise = true) => {
    const key = getKey(options)
    if (instance.store[key]) {
      const cachedData = instance.store[key].value;
      cachedLogs && console.log('fetched from cache ', key)
      if (promise) {
        return new Promise((res, rej) => res(cachedData))
      }
      return cachedData
    }
    return null;
  }

  instance.remove = (options) => {
    // const checkKey = /\/qa\/questions\/[0-9]+\/answers\/||\/qa\/questions/i
    // console.log(instance.store)
    // const keyMatch = key.match(checkKey)
    // console.log(key, keyMatch)
    const key = getKey(options)
    delete instance.store[key]
    cachedLogs && console.log('removed from cache ', key)
    // console.log(instance.store)
  }

  return instance;
}

export default QuickCache;