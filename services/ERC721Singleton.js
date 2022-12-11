import Web3 from 'web3'

import erc721 from '../contracts/deployments/moonbase/GreenDAO.json';

export default function ERC721Singleton(signer) {
	const web3 = new Web3('https://rpc.api.moonbase.moonbeam.network');
	const GreenDAOcontract = new web3.eth.Contract(erc721.abi, erc721.address).methods;

	return GreenDAOcontract
  }
  