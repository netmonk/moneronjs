# moneronjs
A nodejs Monero rpc wallet management package. 

**Under heavy developpment.**

Currently for using it insert : 
`var wallet = require('./moneronjs.js');`

And create a  wallet object like this : 
`var wal =  new wallet.Wallet("127.0.0.1","8082");`

Without any arguments it will try to connect to localhost port 8082 (default rpc daemon port for simplewallet). 

###test.js 
provide basic examples of the current methods available with the wallet object. 
Beware to replace payment_id with valid value of your wallet. 

###wallet available method
Currently available : 
 
*  getaddress(callback): give back the address of the wallet
*  getbalance(callback): give the current **unlocked** balance of wallet
*  getpaymentfromid(payment-id, callback): return the whole transactions associated to the provided payment_id
*  incoming_transfers(status): provide the list of tx available(unSpend) Unavailable(spent) and All
*  getcypheredpaymentid(Uid,amount, password): return a valid payment_id (64char hex string) which is the encrypted using AES-256-CTR of the string "unix_timestampuidamount" (uid is a 10 digit number and amount is a 9 digit number)
*  getrandompaymentid: return a random hexstring of 64 chars length (valid payment_id)
