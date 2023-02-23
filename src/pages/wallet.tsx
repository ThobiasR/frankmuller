import Footer from 'components/Footer';
import Header from 'components/Header';
import Spinner from 'components/Spinner';
import Web3Status from 'components/Web3Status';
import { abi } from 'data/abi';
import { ethers } from 'ethers';
import useMetaMask from 'hooks/useMetamask';
import { useEffect, useState } from 'react';
import { ReactComponent as LogoFranckMuller } from 'svgs/logo--franck-muller.svg';
import { postItem } from '../components/Api/AuthCRUD';
import { fetchUsersNfts, getNfts, TokenAddress, burnAddress } from '../components/Api/nfts';
import store from '../store';

const WalletPage = () => {
  const { account, signer } = useMetaMask();
  const [items, setItems] = useState<any>([]);
  const [claim, setClaim] = useState<boolean>(false);
  const [confirmBurn, setConfirmBurn] = useState<boolean>(false);
  const [claimItem, setClaimItem] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [tokenToBurn, setTokenToBurn] = useState<any>('');
  const [tokenToBurnImage, setTokenToBurnImage] = useState<any>('');
  const [tokenToBurnName, setTokenToBurnName] = useState<any>('');
  const [spinner, setSpinner] = useState<any>(false);
  const [claimedId, setClaimedId] = useState<any>('');

  const token: any = store.getState().auth;

  const reset = () => {
    setClaimItem(false);
    setSpinner(false);
    setClaim(false);
    setConfirmBurn(false);
    setTokenToBurn('');
    setTokenToBurnName('');
    setTokenToBurnImage('');
  };

  const burnNft = async () => {
    setClaimItem(false);
    setSpinner(true);
    const contract = new ethers.Contract(TokenAddress, abi, signer);
    if (account && tokenToBurn != '' && token.token)
      contract
        .transferFrom(account, burnAddress, tokenToBurn)
        .then(() => {
          postItem(tokenToBurn)
            .then(({ data }) => {
              setClaimedId(data.code);
              setSpinner(false);
              setClaimed(true);
            })
            .catch(() => {
              reset();
            });
        })
        .catch(() => {
          reset();
        });
  };

  useEffect(() => {
    const getNft = async () => {
      if (account) {
        const { data } = await fetchUsersNfts(account);
        const nfts = await getNfts(data.result);
        setItems(nfts);
      }
    };

    getNft();
  }, [account]);

  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <section className="relative text-white flex items-center mt-24 mb-20">
            <div className="container px-0">
              <div className="relative w-full h-[300px] border-y-2 border-solid border-white border-opacity-10 xl:rounded-2xl xl:border-2 overflow-hidden">
                <img
                  src="/static/images/banner-aoki-peace.jpg"
                  alt="Aoki Peace"
                  className="absolute top-0 left-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-10 left-6">
                <LogoFranckMuller className="w-20 h-20 fill-current" />
              </div>
            </div>
          </section>
          <section className="text-white mb-16">
            <div className="container">
              <div className="row">
                <div className="col col--12 md:col--8 lg:col--6 prose -fluid-text-2">
                  <h1 className="fluid-text-2">{account ? account.slice(0, 4) + '...' + account.slice(-4) : ''}</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="text-white mb-16">
            <div className="container fluid-text-0">
              <div className="row">
                <div className="col col--12 md:col--8 lg:col--6 prose -fluid-text-2">
                  <h4 className="fluid-text-0">My Collection</h4>
                  {!account && <p className="text-gray-50">Please connect your wallet to see your collection.</p>}
                  {!account && (
                    <>
                      <div className="py-3 flex justify-start">
                        <Web3Status />
                      </div>
                    </>
                  )}
                </div>
              </div>
              {account && (
                <div
                  className="flex flex-wrap flex-col sm:flex-row items-center sm:items-stretch justify-start rounded-2xl gap-4 mt-4 mb-4 py-6 px-5 sm:justify-center"
                  style={{ backgroundColor: '#141414' }}
                >
                  {items.map((item: any, key: number) => (
                    <div
                      key={key}
                      className="p-3 bg-black rounded-2xl"
                      style={{ maxWidth: '240px', minWidth: '240px' }}
                    >
                      <div className=" h-[150px]">
                        <img className="rounded-xl w-[100%] h-[100%] object-cover" src={item?.img} alt="No NFT" />
                      </div>

                      <p className="-text-3 mb-1 mt-3 text-gray-50 uppercase">{item?.name}</p>
                      <p className="-text-1">#{item?.nft_token}</p>
                      <button
                        className="bg-white text-black rounded-l p-2 h-9 text-[12px]"
                        onClick={() => {
                          setClaim(true);
                          setConfirmBurn(true);
                          setTokenToBurn(item?.nft_token);
                          setTokenToBurnName(item?.name);
                          setTokenToBurnImage(item?.img);
                        }}
                      >
                        Claim Reward
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="row p-4 prose -fluid-text-2">
                <h4 className="fluid-text-0">Disclaimer</h4>
                <p className="text-gray-50">
                  If you require any more information or have any technical questions regarding the disclaimer or the
                  wallet integration, please feel free to contact us by email at nft@franckmullerencrypto.com or open a
                  ticket in our discord server.
                  <br />
                  <br />
                  All the information on this website - https://franckmullerencrypto.com/ - is published in good faith
                  and for general information purposes only. Franck Muller Encrypto does not make any warranties about
                  the completeness, reliability and accuracy of this information. Any action you take upon the
                  information you find on this website (Franck Muller Encrypto.), is strictly at your own risk. Franck
                  Muller Encrypto will not be liable for any losses and/or damages in connection with the use of our
                  website.
                </p>
              </div>
            </div>
          </section>
          <hr className="m-0 h-0 border border-solid border-white opacity-10 mt-24" />
        </main>

        <Footer />
      </div>
      {claim && (
        <>
          <div className="claim-modal">
            {confirmBurn ? (
              <div className="claim-modal-container">
                <h2 className="claim-modal-h4">Confirm</h2>
                <p className="claim-modal-p">
                  Are you sure you want to claim your {tokenToBurnName} ? <br /> Once you have claimed your item you
                  cant recover it. This means that your item will be redeemed andd it won&apos;t be visible in you
                  wallet.
                </p>
                <div className="claim-modal-buttons">
                  <button
                    className="accept-claim"
                    onClick={() => {
                      setClaimItem(true);
                      setConfirmBurn(false);
                    }}
                  >
                    yes
                  </button>
                  <button className="decline-claim" onClick={() => setClaim(false)}>
                    No
                  </button>
                </div>
              </div>
            ) : null}
            {claimItem ? (
              <div className="claim-modal-container">
                <h2 className="claim-modal-h4"> {tokenToBurnName}</h2>
                <div className="inner-claim-modal">
                  <div className="inner-claim-modal-image-container">
                    <img src={tokenToBurnImage} alt="" className="inner-claim-modal-image" />
                  </div>
                  <div className="inner-claim-modal-text">
                    <p className="inner-claim-modal-text-p">
                      Your item is ready to be claimed.
                      <br />
                      Click on the button below to claim your {tokenToBurnName}
                    </p>
                    <button
                      className="inner-claim-modal-text-button"
                      onClick={() => {
                        burnNft();
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {spinner ? (
              <div className="spinner-container">
                <Spinner size="xl" />
              </div>
            ) : null}
            {claimed ? (
              <div className="claimed-container">
                <h2 className="claimed-container-h2">Your item has been claimed</h2>
                <p className="claimed-container-text">
                  You have successfully claimed your item!
                  <br />
                  Check the details below for the follow up steps to reedem your item. Make sure you have downloaded the
                  Frank Muller Watchface App. Here is one time code you can fill in the app.
                </p>
                <h2 className="claimed-container-h2">{claimedId}</h2>
                <p className="claimed-container-text">
                  Once you have filled in your unique code, your watch face is visible in your watch face items and is
                  ready to be used. Please check your email with your one-time code and follow up steps.
                </p>
                <button
                  className="claimed-container-button"
                  onClick={() => {
                    setClaimed(false);
                    setClaim(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default WalletPage;
