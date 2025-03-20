import Redis from 'ioredis'

class RedisCache extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB
    })
  }
}

const cache = new RedisCache()
module.exports = cache
