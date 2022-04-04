

const cachedLogs = false // true will turn on all logs to the cache



const cleanup = (key, timeToCleanup, store) => {
  setTimeout(() => {
    cachedLogs && console.log('deleted from cache ', key, timeToCleanup)
    delete store[key]
  }, timeToCleanup)

}



const minute = 60 * 1000;
const baseTime = 2 * minute

const QuickCache = (maxStoreTime = baseTime) => {
  const instance = { maxStoreTime };
  instance.store = {}

  instance.add = (key, value) => {
    const createdAt = Date.now()
    instance.store[key] = { value, createdAt }
    cachedLogs && console.log('added to cache ', key)
    cleanup(key, instance.maxStoreTime, instance.store)
  }

  instance.check = (key, promise = true) => {
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

  instance.remove = (key) => {
    const checkKey = /\/qa\/questions\/[0-9]+\/answers\/||\/qa\/questions/i

    const keyMatch = key.match(checkKey)
    console.log(key, keyMatch)
    if (keyMatch) {
      cachedLogs && console.log('removed from cache ', key)
      delete instance.store[key + '/']
    }
  }

  return instance;
}

export default QuickCache;