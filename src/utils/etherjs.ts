import { ethers } from "ethers";
import Onboard from "bnc-onboard";
import { getPreference } from "./storage";

let onboard: any;
let provider;

export async function initOnboard(setAddressCallback: any) {
  const previouslySelectedWallet = getPreference("selectedWallet", "");
  const onboard = Onboard({
    dappId: "16ede245-d1f4-462f-9614-f9d520a30b9f", // [String] The API key created by step one above
    networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
    subscriptions: {
      address: setAddressCallback,
      wallet: (wallet) => {
        //  web3 = new Web3(wallet.provider)
        provider = new ethers.providers.Web3Provider(wallet.provider);
        console.log("wallet!", wallet);
        console.log("provider!", provider);
      },
    },
  });

  if (previouslySelectedWallet != "") {
    const selected = await onboard.walletSelect(previouslySelectedWallet);
    if (selected) {
      const address = onboard.getState().address;
      setAddressCallback(address);
    }
  }
}

export const connect = async () => {
  const selected = await onboard.walletSelect();
  if (!selected) return false;
  const checked = await onboard.walletCheck();
  if (!checked) return false;
  return onboard.getState().address;
};

export const disconnect = async () => {
  onboard.walletReset();
};
