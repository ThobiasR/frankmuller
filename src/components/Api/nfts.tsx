import axios from 'axios';

export const TokenAddress = '0xE29627fAd74Eb8C4f9F791b083bCAe2F8901eE3c';

export const burnAddress = '0x000000000000000000000000000000000000dEaD';

const apiKey = 'QIo11MDa8uJ0xwrUv1yQr076GaCl5u3G50PhimRsDQmF5Bd4lDxGOspxo6bOH9j4';

const userDataOptions = (userAddress: string) => {
  return {
    ethod: 'GET',
    url: `https://deep-index.moralis.io/api/v2/${userAddress}/nft`,
    params: {
      chain: 'bsc',
      format: 'decimal',
      token_addresses: TokenAddress,
    },
    headers: { accept: 'application/json', 'X-API-Key': apiKey },
  };
};

const nftDataOption = (nftId: string) => {
  return {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${TokenAddress}/${nftId}`,
    params: { chain: 'bsc', format: 'decimal' },
    headers: { accept: 'application/json', 'X-API-Key': apiKey },
  };
};

export const fetchUsersNfts = async (userAddress: string) => {
  return await axios.request(userDataOptions(userAddress));
};

export const getNftList = async (nftId: string) => {
  return await axios.request(nftDataOption(nftId));
};

export const getNfts = async (usernfts: any[]) => {
  const nfts: any = [];
  for (const a of usernfts) {
    const { data } = await getNftList(a.token_id);
    const metadata = JSON.parse(data.metadata);

    const nft = {
      description: metadata.description,
      img: metadata.image,
      claimed: 0,
      nft_token: a.token_id,
      name: metadata.name,
    };

    nfts.push(nft);
  }

  return nfts;
};
