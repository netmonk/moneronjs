var wallet = require('./moneronjs.js');
console.log("==========================================================================");
console.log("this is a wallet rpc interface test");
var wal =  new wallet.Wallet("127.0.0.1","8082");
console.log(wal.opt);

wal.getaddress(function(address){
	  console.log("==========================================================================");
          console.log("lets try to get the address of the wallet");
          console.log(address);
});
wal.getbalance(function(bal,ulock){
	console.log("==========================================================================");
        console.log("lets try to get balance of the wallet");
        console.log("total balance: "+ bal);
        console.log("unlocked balance: "+ ulock);
});
wal.getpaymentfromid("d9ed4ef9e7d80f71f90d419152720177db3df9975f52a50f0172276224214b1b",function(result){
	console.log("==========================================================================");
        console.log("let's try to get payment by id : d9ed4ef9e7d80f71f90d419152720177db3df9975f52a50f0172276224214b1b");
        console.log(result);
});
  
  
wal.getpaymentfromid("0000000000000000000000000000000000000000000000000000000000000000",function(result){
	  console.log("==========================================================================");
          console.log("let's try to get payment by id : 0000000000000000000000000000000000000000000000000000000000000000");
          console.log(result);
});

wal.incoming_transfers("available",function(result){
	console.log("==========================================================================");
        console.log("Listing of TX UnSpend");
        console.log(result);
});
wal.incoming_transfers("unavailable",function(result){
	console.log("==========================================================================");
        console.log("Listing of TX Spend");
        console.log(result);
});

wal.getcypheredpaymentid('0004567890',230999909,'tototi', function(result){
	console.log("==========================================================================");
	console.log("let's try to get a cyphered payment_id with value 0004567890,230999909,tototi");
	console.log(result);
});
wal.getrandompaymentid(function(result){
	console.log("==========================================================================");
	console.log("let's try to get a random payment_id");
	console.log("result: ", result);
	
});
