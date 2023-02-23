import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  let provider;
  let signer;

  if (typeof window !== 'undefined') {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }
  }

  return {
    activateBrowserWallet,
    account,
    deactivate,
    provider,
    signer,
  };
};

export default useMetaMask;
