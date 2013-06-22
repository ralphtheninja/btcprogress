var request = require('request')
var paramify = require('paramify')
var opts = require('optimist').argv
var stack = require('stack')
var ecstatic = require('ecstatic')
var bar = require('canvas-progress-bar')()

//20 second microcache, to stay under the blockchain
//api rate limit.
// https://blockchain.info/q

var cache = {}

function balance(address, cb) {
  if (cache[address])
    return cb(null, cache[address])

  var options = {
          uri: 'https://blockchain.info/address/' + address + '?format=json'
        , json: true
      }

  request.get(options, function (err, _, body) {
    if (err) return cb(err)
    cache[address] = body.total_received

    setTimeout(function () {
      delete cache[address]
    }, 10)

    cb(err, cache[address])
  })
}

function middleware () {
  return function (req, res, next) {
    req.resume()

    function error(err) {
      if (next) return next(err)
      res.writeHead(400, { 'Content-Type': 'text/html' })
      res.end(err.message || err)
    }

    var match = paramify(req.url).match

    if (!match(':address/:balance')) {
        // TODO return root index.html
        if (next) return next()
        error('Missing address and/or balance')
    }

    balance(match.params.address, function (err, data) {
      var percent = data / 100000000 / (match.params.balance || 1)
      bar.progress(percent)
      bar.pngStream().pipe(res)
      res.writeHead(200, { 'Content-Type': 'image/png' })
    })
  }
}

module.exports = middleware
module.exports.balance = balance

var port = opts.port || 8080

if (!module.parent && !process.browser) {
  require('http').createServer(
    stack(middleware(),ecstatic(__dirname+'/static'))
  ).listen(port, function () {
    console.log('Server started on port ' + port)
  })
}
