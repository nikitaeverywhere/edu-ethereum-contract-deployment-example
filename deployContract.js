/**
 * This script will deploy sample Voting contract to Ethereum TestRPC.
 *
 * Before executing this script, run Ethereum TestRPC from the console:
 *     > .\node_modules\.bin\testrpc (Windows)
 *     $ ./node_modules/.bin/testrpc (*nix)
 *
 * @see https://github.com/ZitRos/edu-ethereum-web3-contract-deployment-example
 */

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const fs = require("fs");
const solc = require("solc");

const contractToCompile = "Voting"; // .sol (in local directory)
const listOfCandidates = ["Nick", "Edward", "John"];

let contractAccount; // will be assigned later

// Let's see the list of available accounts first.
console.log(`Listing available accounts...`);
web3.eth.getAccounts().then((accountsList) => {

	console.log(`Available accounts (${ accountsList.length }):\r\n${ accountsList.join("\r\n") }`);
	contractAccount = accountsList[0];
	console.log(`We will deploy contract from account ${ contractAccount }`);

	compile(contractToCompile);

});

function compile (contractName) {

	console.log(`Compiling ${ contractName }.sol...`);

	const contractCode = fs.readFileSync(`${ contractName }.sol`).toString();
	const compiledCode = solc.compile(contractCode);
	const abiDefinition = JSON.parse(compiledCode.contracts[`:${ contractName }`].interface);
	const contract = new web3.eth.Contract(abiDefinition);

	deploy(contractName, contract, compiledCode);

}

function deploy (contractName, contract, compiledCode) {

	console.log(`Preparing ${ contractName } contract to be deployed...`);

	const preparedContract = contract.deploy({
		data: compiledCode.contracts[`:${ contractName }`].bytecode,
		gas: 4700000,
		arguments: [
			// first argument: array of names (which we need to convert to HEX)
			listOfCandidates.map(name => web3.utils.asciiToHex(name))
		]
	}, (err) => err && console.error(err));

	preparedContract.estimateGas().then((gas) => {

		console.log(`Gas estimation for deploying this contract: ${ gas }`);

		preparedContract.send({
			from: contractAccount,
			gas: gas + 100000
		}).then((deployedContract) => {

			console.log(
				`Contract successfully deployed, contract address: ${ 
				deployedContract.options.address }`
			);

			interactionTest(deployedContract);

		});

	});

}

function interactionTest (contract) {

	// Check -> Vote -> Check -> Vote -> Check! (Should be 2 votes)
	checkVotes(() =>
	voteFor(listOfCandidates[0], () =>
	checkVotes(() =>
	voteFor(listOfCandidates[0], () =>
	checkVotes(() => console.log("Done!"))))));

	function checkVotes (next) {

		console.log(`Let's see how many votes are received for ${ listOfCandidates[0] }...`);

		contract.methods["totalVotesFor"](
			web3.utils.asciiToHex(listOfCandidates[0])
		).call().then((votes) => {

			console.log(
				`${ listOfCandidates[0] } has got ${ votes } vote${ votes === 1 ? "" : "s" }!`
			);

			next();

		});

	}

	function voteFor (candidate, next) {

		console.log(`Let's vote for ${ candidate } as ${ contractAccount }...`);

		contract.methods["voteForCandidate"](
			web3.utils.asciiToHex(candidate) // again, convert candidate name to HEX
		).send({
			from: contractAccount // let the contract holder vote
		}).then((tx) => {

			console.log(
				`Successfully voted for ${ candidate }. Gas used: ${ tx.gasUsed 
				} Transaction hash: ${ tx.transactionHash }`
			);

			next();

		});

	}

}