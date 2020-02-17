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

HttpAuth.prototype.authenticate = function(user, password, cb) {
  var self = this
  axios({
    method: 'get',
    url: `${self._config.url}?username=${user}&password=${password}`,
  })
    .then(response => {
      if (response.data.errNo !== 0) {
        return cb(null, false)
      } else {
        return cb(null, [user])
      }
    })
    .catch(err => {
      return cb(null, false)
    })
}

HttpAuth.prototype.adduser = function(user, password, cb) {
  var self = this
  axios({
    method: 'get',
    url: `${self._config.url}?username=${user}&password=${password}`,
  })
    .then(response => {
      if (response.data.errNo !== 0) {
        return cb(null, false)
      } else {
        return cb(null, [user])
      }
    })
    .catch(err => {
      return cb(null, false)
    })
}
