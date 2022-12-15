import Web3 from "web3";

import erc721 from "../contracts/deployments/moonbase/GreenDAO.json";

export default function ERC721Singleton(signer) {
	let web3;
	web3 = new Web3("https://rpc.api.moonbase.moonbeam.network");
	try {
		if (Number(window?.ethereum?.networkVersion) === Number(1287)) {
			web3 = new Web3(window.ethereum);
			console.log("using moonbase")
		}
	} catch (error) {	}
	
	const GreenDAOcontract = new web3.eth.Contract(erc721.abi, erc721.address).methods;

	return GreenDAOcontract;
}
