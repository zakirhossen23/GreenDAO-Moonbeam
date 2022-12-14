import {ethers} from "ethers";
import config from "../../contracts/chaininfo/config.json";
import messengerABI from "../../contracts/deployments/moonbase/Messenger.json";

export async function sendMessage(chainid,ideaId, msg) {
	let FromNetwork = config[chainid];

	const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
	//From Sending Chain
	const FromContract = new ethers.Contract(FromNetwork.MessengerAddress, messengerABI.abi, signer);

	const tx = await (
		await FromContract.sendMsg(Buffer.from(ideaId,msg), {
			gasLimit: 600000,
			gasPrice: ethers.utils.parseUnits("10", "gwei")
		})
	).wait();
	const seq = parseSequenceFromLogEth(tx, FromNetwork["corebridgeAddress"]);
	const emitterAddr = getEmitterAddressEth(FromNetwork.MessengerAddress);
	let vaaBytes = {
		vaaBytes: null
	};
	while (!vaaBytes["vaaBytes"]) {
		await new Promise((r) => setTimeout(r, 5000)); //wait for Guardian to pick up message
		console.log("Searching for: ", `${config.wormhole.restAddress}/v1/signed_vaa/${srcNetwork.wormholeChainId}/${emitterAddr}/${seq}`);
		vaaBytes = await (await fetch(`${config.wormhole.restAddress}/v1/signed_vaa/${srcNetwork.wormholeChainId}/${emitterAddr}/${seq}`)).json();
	}

	//Target Chain Moonbase
	const targetNetwork = config["1287"]; //Moonbase
	const TargetSigner = new ethers.Wallet(targetNetwork.privateKey).connect(new ethers.providers.JsonRpcProvider(targetNetwork.rpc));
	const TargetContract = new ethers.Contract(targetNetwork.MessengerAddress, messengerABI.abi, TargetSigner);

	await (await TargetContract.receiveEncodedMsg(Buffer.from(vaa, "base64"))).wait();
}
