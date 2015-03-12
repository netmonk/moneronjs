exports.Wallet = Wallet;

var http = require('http');
var crypto = require('crypto'),   
    algorithm = 'aes-256-ctr',
    password = 'aaaaaaaaaa';

function jsonHttpRequest(host, port, data, callback){

    var options = {
        hostname: host,
        port: port,
        path: '/json_rpc',
        method: 'POST',
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    var req = http.request(options, function(res){
        var replyData = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            replyData += chunk;
        });
        res.on('end', function(){
            var replyJson;
            try{
                replyJson = JSON.parse(replyData);
            }
            catch(e){
                callback(e);
                return;
            }
            callback(null, replyJson);
        });
    });

    req.on('error', function(e){
        callback(e);
    });

    req.end(data);
}

function rpc(host, port, method, params, callback){

    var data = JSON.stringify({
        id: "0",
        jsonrpc: "2.0",
        method: method,
        params: params
    });
    jsonHttpRequest(host, port, data, function(error, replyJson){
        if (error){
            callback(error);
            return;
        }
        callback(replyJson.error, replyJson.result);
    });
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
      }
  return number + ""; // always return a string
}


function generatecypheredpaymentid(uid,amount,pass,callback){
          if (amount > 999999999) {
                  error="amount too big";
                  callback(error,null);
                  return;
          } else if (uid.length > 10){
                  error="uid lenght to big";
                  callback(error,null);
                  return;
          } else if (pass.length < 6 ) {
                  error="pass too weak, choose a longer pass";
                  callback(error,null);
                  return;
          }
          var toocrypt = [Date.now(), uid,zeroFill(amount,9)];
          crypto.password= pass;
          var cipher =  crypto.createCipher("aes-256-ctr",pass);
          //console.log("to encrypt: "+toocrypt.join(''));
          var txt=toocrypt.join("");
          var crypted = cipher.update(txt,'utf8', 'hex');
          crypted += cipher.final('hex');
          //console.log(crypted);
          return callback(null,crypted);
}

function decyphercryptedpaymentid(pid,pass,callback){
        crypto.password = pass;
        var decipher = crypto.createDecipher("aes-256-ctr", pass);
        var dec = decipher.update(pid,'hex','utf8');
        dec += decipher.final('utf8');
        console.log(dec);
        return callback(null,dec);

}


function Wallet(ip,port){
	var self = this; 
	self.opt = {
		ip: ip,
		port: port,
		openalias:''
	};
	if (typeof self.opt.ip === "undefined") {self.opt.ip = "127.0.0.1"}; 
	if (typeof self.opt.port == "undefined") {self.opt.port = "8082"}

	self.getaddress = function (callback){
		rpc(self.opt.ip, self.opt.port, "getaddress",'', function(error,result){
                    if (error){
	         	    console.log("error in getting address: %j", [error]);
                            return;
		   } else { //console.log(result)
		   	var address = result.address;
			callback(address); 
		   
		   
		   }
		});	
	}
	self.getbalance = function(callback){
                rpc(self.opt.ip, self.opt.port, "getbalance",'', function(error,result){
                    if (error){
                            console.log("error in getting balance: %j", [error]);
                            return;
		    } else {//console.log(result)
			    var unlocked = result.unlocked_balance;
			    var balance = result.balance;
			    callback(balance, unlocked);
		    }
		});     
	}
	self.getpaymentfromid= function(pid, callback){
		rpc(self.opt.ip, self.opt.port, "get_payments", { "payment_id" : pid }, function(error,result){
		     if (error){
		             console.log("error in getting payment: %j",[error]);
		             return;
		     } else {//console.log(result)
			     callback(result);
		     }
		});
	}
        self.incoming_transfers= function(type,callback){
                rpc(self.opt.ip, self.opt.port, "incoming_transfers", { "transfer_type" : type }, function(error,result){
                     if (error){
                             console.log("error in getting incoming_transfers: %j", [ error]);
                             return;
                     } else {
                             callback(result);
                     }
                });
        }
	self.getcypheredpaymentid= function(id,amount,pass, callback){
		generatecypheredpaymentid(id,amount,pass, function(error,result){
		        if (error) {
			                console.log(error);
			                return;
			        }else {
				        //console.log("result: "+result+" "+result.length);
				        callback(result);
				        }
		});
	}

}


