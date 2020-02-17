var axios = require('axios')

module.exports = HttpAuth

function HttpAuth(config, stuff) {
  var self = Object.create(HttpAuth.prototype)

  // config for this module
  self._config = config

  // sinopia logger
  self._logger = stuff.logger

  var url = self._config.url
  if (!url) throw new Error('should specify "url" in config')

  return self
}

function verify(user, password, cb) {
  var self = this

  self._logger.info(
    `user: ${user}, password: ${password}, auth_url: ${self._config.url}`
  )
  axios({
    method: 'get',
    url: `${self._config.url}?username=${user}&password=${password}`,
  })
    .then(response => {
      if (response.data.errNo !== 0) {
        self._logger.info(
          `user: ${user}, password: ${password}, status: no, data: ${JSON.stringify(
            response.data
          )}`
        )
        return cb(null, false)
      } else {
        self._logger.warn(
          `user: ${user}, password: ${password}, status: yes, data: ${JSON.stringify(
            response.data
          )}`
        )
        return cb(null, [user])
      }
    })
    .catch(err => {
      self._logger.error(err.message || `plugins "http-auth" system error`)
      return cb(err)
    })
}

HttpAuth.prototype.authenticate = verify
HttpAuth.prototype.adduser = verify
