# moneronjs
A nodejs Monero rpc wallet management package. 

**Under heavy developpment.**

Currently for using it insert : 
`var wallet = require('./moneronjs.js');`

And create a  wallet object like this : 
`var wal =  new wallet.Wallet("127.0.0.1","8082");`

Without any arguments it will try to connect to localhost port 8082 (default rpc daemon port for simplewallet). 

**test.js** provide basic examples of the current methods available with the wallet object. 
Beware to replace payment_id with valid value of your wallet. 

 
