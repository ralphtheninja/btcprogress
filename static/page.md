# BitCoin Backer

Iteratively Back Open Source Projects with BitCoin.

Bitcoin has a lot of potential, but currently,
it’s way too hard to build things with it.

Also, the world needs more open source,
and people who use open source need better ways to encourage it, (i.e. to fund it)

We already have kickstarter, and gittip.
These are good things, but we need more good things.
GitTip is like busking but software is not like playing music on the sidewalk.
Kickstarter essentially forces you to use the
[waterfall model](https://en.wikipedia.org/wiki/Waterfall_model),
which has long been known as a recipe for disaster!

Since BitCoin is Open Source Money, lets hit both nails with one hammer!

I should be easy to fund a project _iteratively_,
and funding a project should be an important way of providing feedback.
You can’t produce good software without feedback.

And also, since this is open source,
it should be possible to host your own fundable project on your own server,
like you can host your own blog. It must be that simple.

It must be this simple:

``` js
var Wallet = require("bitcoin-wallet")
var wallet = new Wallet({watch: ADDRESS, minConfimations: 2})
wallet.on("transaction", function (trx) {
  //you just received a transaction,
  //do something with it!
  this.balance()
})
```

Infact, that is the code used to make this site!

You can [fund this project](bitcoin:1EU3zgQiyDphRH3d12Cbr1UzEujNtkyKeN). The bitcoin address is 1EU3zgQiyDphRH3d12Cbr1UzEujNtkyKeN

![progress bar here](/1EU3zgQiyDphRH3d12Cbr1UzEujNtkyKeN/10)

This website is the MVP for this project, so far we have created just enough to get this page up, and get your feedback.

## project dreams - long range goals

* improve bitcoinjs / remove blockchain.info dep - it must be possible to run everything locally
* trigger automatic actions (including payments) when a wallet reaches a threshold
  (time, or amount)
* trelloesque way to back specific issues, or
* probably many other bitcoin specific node modules that we’ll need to build such a system!

[you tell us?](https://github.com/ralphtheninja/btcprogress/issues/new)

# immediate goals

* create simple progress bar png that can be included directly into a README/issue/blog *DONE*
* able to trigger payments from events
* make your own funding app/page in a page of code.
* define tasks and funding limits

The first step is just to discover if people are into this idea,
so we have set our initial round for the second iteration at just 10 bitcoins,
please help, fork, or post an issue on 
[project-repo](https://github.com/ralphtheninja/btcprogress/issues/new)
about the features you are looking for.


<a href="https://github.com/ralphtheninja/btcprogress">
<img style="position: absolute; top: 0; right: 0; border: 0;"
  src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
  alt="Fork me on GitHub">
</a>
