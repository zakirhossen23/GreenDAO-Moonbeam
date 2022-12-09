// contracts/Messenger.sol
// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.0;

import "./interfaces/IWormhole.sol";

contract Messenger {
    //The Moonbeam Core Bridge contract address
    address a = address(0xa5B7D85a8f27dd7907dc8FdC21FA5657D5E2F901);
    IWormhole core_bridge = IWormhole(a);

    function sendStr(bytes memory str, uint32 nonce) public returns (uint64 sequence) {
        sequence = core_bridge.publishMessage(nonce, str, 1);
        return sequence;
    }
    function wormhole() public view returns (IWormhole) {
        return core_bridge;
    }

// Verification accepts a single VAA, and is publicly callable.
function processMyMessage(bytes32 memory VAA) public {
    // This call accepts single VAAs and headless VAAs
    (IWormhole.VM memory vm, bool valid, string memory reason) =
        core_bridge.parseAndVerifyVM(VAA);

    // Ensure core contract verification succeeded.
    require(valid, reason);

    // Ensure the emitterAddress of this VAA is a trusted address
    require(myTrustedContracts[vm.emitterChainId] ==
        vm.emitterAddress, "Invalid Emitter Address!");

    // Check that the VAA hasn't already been processed (replay protection)
    require(!processedMessages[vm.hash], "Message already processed");

    // Check that the contract which is processing this VAA is the intendedRecipient
    // If the two aren't equal, this VAA may have bypassed its intended entrypoint.
    // This exploit is referred to as 'scooping'.
    require(parseIntendedRecipient(vm.payload) == msg.sender);

    // Add the VAA to processed messages so it can't be replayed
    processedMessages[vm.hash] = true

    // The message content can now be trusted.
    doBusinessLogic(vm.payload)
}

//This is the function which would receive the the VAA from the relayer
function receiveVAA(bytes32 memory batchVAA) public {
    // First, call the core bridge to verify the batchVAA
    // All the individual VAAs inside the batchVAA will be cached,
    // and you will receive headless VAAs inside the VM2 object.
    // Headless VAAs are verifiable by parseAndVerifyVM.

    (IWormhole.VM2 memory vm2, bool valid, string memory reason) =
        core_bridge.parseAndVerifyBatchVM(batchVAA, true);

    // I know from sendMyMessage that the first VAA is a token bridge VAA,
    // so let's hand that off to the token bridge module.
    bytes vaaData = token_bridge.completeTransferWithPayload(vm2.payloads[0]);

    // The second VAA is my message, let's hand that off to my module.
    processMyMessage(vm2.payloads[1]);

    // Lastly, uncache the headless VAAs from the core bridge.
    // This refunds a significant amount of gas.
    core_bridge.clearBatchCache(vm2.hashes);
}


}