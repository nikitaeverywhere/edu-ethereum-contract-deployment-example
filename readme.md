# Ethereum Contract Deployment Example with web3

This is [a JavaScript example](deployContract.js) of Ethereum voting [Smart Contract](Voting.sol) 
deployment and a basic interaction with it via [TestRPC](https://github.com/ethereumjs/testrpc).

This example:
+ Lists available accounts
+ Compiles a Smart Contract
+ Deploys a Smart Contract
+ Executes Smart Contract's methods

Voting process:
+ Smart Contract is deployed to Ethereum network with **a list of candidates**.
+ Everyone in the network can vote for these candidates.
+ Everyone in the network can check how many votes particular candidate has.

Sample Output
-------------

```text
$ node deployContract.js
Listing available accounts...
Available accounts (10):
0xD5F09bcF69ec2fbbAd5011Fb7E62d5B05F7d7af8
0xE4adB5bc9e3f862095ba1896f219e7931747cF12
0x160Ac5339451ad7e3475d13b56358B6fB7bC2e28
0x8D04B47f415958abe9a7B916306dB2c82F1B9Bb1
0x87e9d9F2D3438849A62eAABa0c2d5a451a459ef2
0xeE17Fc8E7b90D790D3086764C4cCE3023c8e87eF
0x0F1fDA24FAf92EBF623B372D989bd06Bb6D18948
0xE029F41b7160B9205CcD7f66eF891e648790deae
0x5f4dFC0e50e7AdBb96955e5fC6e7e3Cf2d6C319a
0x9970B26671258ba89a9888E428E9a3Ccf1FC04EA
We will deploy contract from account 0xD5F09bcF69ec2fbbAd5011Fb7E62d5B05F7d7af8
Compiling Voting.sol...
Preparing Voting contract to be deployed...
Gas estimation for deploying this contract: 354652
Contract successfully deployed, contract address: 0xb5F5AFe44Cf79DE8b378D781e3BBD5475Da80A40
Let's see how many votes are received for Nick...
Nick has got 0 votes!
Let's vote for Nick as 0xD5F09bcF69ec2fbbAd5011Fb7E62d5B05F7d7af8...
Successfully voted for Nick. Gas used: 43402 Transaction hash: 0x8b7625129d0eec68956d6e2c9b8eb3c84d284593f2560eef73a10f69c5f8f5f9
Let's see how many votes are received for Nick...
Nick has got 1 votes!
Let's vote for Nick as 0xD5F09bcF69ec2fbbAd5011Fb7E62d5B05F7d7af8...
Successfully voted for Nick. Gas used: 28402 Transaction hash: 0xa3429fcf934f31f1c872ee2f1c66a4bba24fe0a815e1458cfb6b9be400242470
Let's see how many votes are received for Nick...
Nick has got 2 votes!
Done!
```

How to Launch This Example
--------------------------

1. You will need latest [NodeJS](https://nodejs.org).
2. Clone this repository and `cd` to it.
3. Run `npm install`. In case of Windows, before running `npm install` do [this](https://medium.com/@PrateeshNanada/steps-to-install-testrpc-in-windows-10-96989a6cd594).
4. Run `node deployContract` and see the result.

[Voting.ABI.json](Voting.ABI.json) is just an [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
of compiled contract.

Contributing
------------

Those pull request which **update** dependencies to their newer versions are very welcome. Due to
Ethereum is under active development, its API changes respectively from time to time.

License
-------

[MIT](license) © [Nikita Savchenko](https://nikita.tk)

---

[Original tutorial](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)
by [Mahesh Murthy](https://medium.com/@mvmurthy).
