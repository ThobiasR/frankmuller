import Button from 'components/Button';
import useMetaMask from 'hooks/useMetamask';
import Link from 'next/link';
import { ReactComponent as LogoMetamask } from 'svgs/logo--metamask.svg';

const Web3Status = () => {
  const { account, activateBrowserWallet, deactivate } = useMetaMask();
  //Wallet connect module change
  return (
    <>
      {account ? (
        <div className="flex items-center">
          <div className="text-white pr-2">
            {account.slice(0, 4)}...{account.slice(-4)}
          </div>
          <Button onClick={deactivate} kind="outline" size="sm" className="pointer-events-auto flex justify-start">
            <LogoMetamask className="block h-6 w-6 pr-1" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button
            onClick={activateBrowserWallet}
            kind="outline"
            size="sm"
            className="pointer-events-auto flex justify-start"
          >
            <LogoMetamask className="block h-6 w-6 pr-1" />
            Connect
          </Button>
        </Link>
      )}
    </>
  );
};

export default Web3Status;
