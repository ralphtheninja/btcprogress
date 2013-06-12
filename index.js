var request = require('request')
var JSONStream = require('JSONStream')
var paramify = require('paramify')
var path = require('path')

var Canvas = require('canvas')
var canvas = new Canvas(47, 267)
var ctx = canvas.getContext('2d')

function draw(percent, ctx, cb) {
  percent = Math.min(percent, 100)
  ctx.clearRect(0, 0, 47, 267)
  loadImage('resources/body.png', function (err, img) {
    if (err) return cb(err)

    // draw body
    ctx.drawImage(img, 0, 0)

    if (percent === 0) return cb(null)

    loadImage('resources/scale.png', function (err, img) {
      if (err) return cb(err)

      // draw up to 10%
      var maxOffset = Math.min(percent, 10) * 1.3
      for (var i = 1; i < maxOffset; ++i) {
        ctx.drawImage(img, 9, 253 - i)
      }

      // draw above 10%
      if (percent > 10) {
        percent -= 10
        maxOffset = percent * 2.6
        for (i = 1; i < maxOffset; ++i) {
          ctx.drawImage(img, 9, 241 - i)
        }
      }

      cb(null)
    })

  })
}

function loadImage(src, cb) {
  var img = new Canvas.Image()
  img.onload = function () {
    cb(null, img)
  }
  img.onerror = function () {
    cb(new Error('Failed to load image ' + src))
  }
  img.src = path.join(__dirname, src)
}

function balanceStream(address) {
  var options = {
          uri: 'https://blockchain.info/address/' + address + '?format=json'
      }
  var parser = JSONStream.parse(['total_received'])
  request.get(options).pipe(parser)
  return parser
}

if (!module.parent && !process.browser) {
  require('http').createServer(function (req, res) {
    var match = paramify(req.url).match
    if (!match(':address/:balance')) {
      // TODO return root index.html
      res.writeHead(400, { 'Content-Type': 'text/html' })
      return res.end('Missing address and/or balance')
    }

    var stream = balanceStream(match.params.address)
    stream.on('data', function (data) {
      stream.end()
      var percent = data / 1000000 / match.params.balance
      percent = Math.floor(10 * percent)/10
      draw(percent, ctx, function (err) {
        if (err) return console.log(err)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<img src="' + canvas.toDataURL() + '" />')
        res.end('<br>' + percent + '%')
      })
    })

  }).listen(8080)
  console.log('Server started on port 8080')
}
