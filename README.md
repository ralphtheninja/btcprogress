#btcprogress

[![Greenkeeper badge](https://badges.greenkeeper.io/ralphtheninja/btcprogress.svg)](https://greenkeeper.io/)

Uses data from blockchain.info and returns a png progressbar for the current funding of the provided address. I had to shut down the online service
for financial reasons but you can host it yourself very easily.

[![Dependency Status](https://david-dm.org/ralphtheninja/btcprogress.png)](https://david-dm.org/ralphtheninja/btcprogress)

Include a bar showing progress towards a funding target like this:

```
<!-- example.com/$btc_address/$funding_target -->
<img src=http://example.com/1MWdTySikEqszL6cUYDiZ6Xb9EutptMtFM/0.1>
```

Currently, this project just exports a express style middleware, that you can include in your own servers.

``` js
require('http').createServer(require('btcprogress')).listen(8000)
```

