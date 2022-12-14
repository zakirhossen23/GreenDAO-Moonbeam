import * as dotenv from 'dotenv';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
dotenv.config();

module.exports = {
	networks: {
		//Specifing Moonbeam Testnet network for smart contract deploying
		moonbase: {
			url: "https://rpc.api.moonbase.moonbeam.network",
			accounts: [`fb57cdb52c16a26a9f54d37ce8f106bc4a334772d5c376c08f009e042cb0a7fe`],
			chainId: 1287,
			gasPrice: 10_000_000_000
		},
		goerli: {
			url: "https://goerli.infura.io/v3/32f0f36f9fa64d1dabac0dbc2a768ba2",
			accounts: [`fb57cdb52c16a26a9f54d37ce8f106bc4a334772d5c376c08f009e042cb0a7fe`],
			chainId: 5,
			gasPrice: 10_000_000
		},
		bsc: {
			url: "https://data-seed-prebsc-1-s3.binance.org:8545",
			accounts: [`fb57cdb52c16a26a9f54d37ce8f106bc4a334772d5c376c08f009e042cb0a7fe`],
			chainId: 97,
			gasPrice: 10_000_000_000
		},
		alfajore: {
			url: "https://alfajores-forno.celo-testnet.org",
			accounts: [`fb57cdb52c16a26a9f54d37ce8f106bc4a334772d5c376c08f009e042cb0a7fe`],
			chainId: 44787,
			name: "Celo Alfajore Testnet",
			gasPrice: 10_000_000_000
		},
	},
	//Specifing Solidity compiler version
	solidity: {
		compilers: [
			{
				version: '0.7.6',
			},
			{
				version: '0.8.6',
			},
		],
	},
	//Specifing Account to choose for deploying
	namedAccounts: {
		deployer: 0,
	}
};