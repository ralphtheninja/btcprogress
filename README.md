#btcprogress

Fund your project with bitcoins.

[![Dependency Status](https://david-dm.org/ralphtheninja/btcprogress.png)](https://david-dm.org/ralphtheninja/btcprogress)

Include a bar showing progress towards a funding target like this:

```
<!-- btcprogress.com/$btc_address/$funding_target -->
<img src=http://btcprogress.com/1MWdTySikEqszL6cUYDiZ6Xb9EutptMtFM/0.1>
```

currently, this project just exports a express style middleware,
that you can include in your own servers.

``` js
require('http').createServer(require('btcprogress')).listen(8000)
```

