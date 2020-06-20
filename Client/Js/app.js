const Web3 = require('web3');

const ipaddress = 'http://localhost:7546';

const contractAddress = '0xb32019407e1b270e279b39d4c08234b0d453a21a';

let account;
let web3;
let ERC20_Token;

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nameOfToken",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "totalSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

//window.ethereum.enable();


if (typeof window.Web3 !== 'undefined') {		
	// Use Mist/MetaMask's provider
	console.log("   Using MetaMask provided object	 ");
	web3Provider = new Web3(window.Web3.currentProvider);
	} 
else {
	console.log("    Din take metamask web3 obj   ");
	// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	web3Provider = new Web3(new Web3.providers.HttpProvider(ipaddress));
	}





web3 = new window.Web3(web3Provider.givenProvider);
console.log(" The provider is : ",web3Provider);
let contract = web3.eth.contract(abi);
ERC20_Token = contract.at(contractAddress);

//account = web3Provider.eth.getAccounts;
//console.log("  The accounts are :  ", account[0]);
account = '0xe6edb8a1147Cf9b4ef46E153843c8593f20D443A';

web3Provider.eth.getAccounts(async function(error, accounts) {

        if (error == null && accounts.length > 0) {
          account = accounts;
        }
		else{
			console.log("  couldn't get the account  ");
			console.log(account	);
		}
});		



let transfer = function () 	{
	reciepientAdd = document.getElementById('reciepientAdd').value;
	amount = document.getElementById('transfer-Amount').value;
	if (reciepientAdd.length > 0) {
		ERC20_Token.transfer(reciepientAdd,amount,{from: account}, (err, res) => {
			if (err) {
				document.getElementById('transferResult').innerHTML = err.toString();
			} else {
				console.log(res);
				document.getElementById('transferResult').innerHTML = res;
			}
		});
	} else {
		document.getElementById('transferResult').innerHTML = 'Please mention who you want to vote for!';
	}
};


let approve = function () {
	senderAdd = document.getElementById('senderAdd').value;
	amount = document.getElementById('approve-Amount').value;
	if (senderAdd.length > 0) {
		ERC20_Token.approve(senderAdd,amount,{from: account}, (err, res) => {
			if (err) {
				document.getElementById('approveResult').innerHTML = err.toString();
			} else {
				console.log(res);
				document.getElementById('approveResult').innerHTML = res;
			}
		});
	} else {
		document.getElementById('approveResult').innerHTML = 'Please mention who you want to vote for!';
	}
};

let balance = function () {
	address = document.getElementById('balanceof-Add').value;
	
	if (address.length > 0) {
		ERC20_Token.balanceOf(address,{from: account}, (err, res) => {
			if (err) {
				document.getElementById('balanceOfResult').innerHTML = err.toString();
			} else {
				console.log(res);
				document.getElementById('balanceOfResult').innerHTML = res;
			}
		});
	} else {
		document.getElementById('balanceOfResult').innerHTML = 'Please mention who you want to vote for!';
	}
};


let allowance = function () {
	ownerAdd = document.getElementById('ownerAdd').value;
	spenderAdd = document.getElementById('spenderAdd').value;
	if (ownerAdd.length > 0) {
		ERC20_Token.allowance(ownerAdd,spenderAdd,{from: account}, (err, res) => {
			if (err) {
				document.getElementById('allowanceResult').innerHTML = err.toString();
			} else {
				console.log(res);
				document.getElementById('allowanceResult').innerHTML = res;
			}
		});
	} else {
		document.getElementById('allowanceResult').innerHTML = 'Please mention who you want to vote for!';
	}
};