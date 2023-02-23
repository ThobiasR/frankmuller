import Button from 'components/Button';
import Countdown from 'components/Countdown';
import Footer from 'components/Footer';
import Header from 'components/Header';
import useCountdown from 'hooks/useCountdown';
import { ReactComponent as LogoMetamask } from 'svgs/logo--metamask.svg';

export const MYSTERY_LAUNCH_DATE = new Date(Date.UTC(2022, 5, 27, 11));

const RegisterPage = () => {
  const counter = useCountdown(MYSTERY_LAUNCH_DATE);
  const isEnded = Object.values(counter).every(value => value === 0);

  return (
    <>
      <Header />
      <main>
        <section className="relative text-white pb-24 pt-32 flex items-center min-h-[600px]">
          <img
            className="absolute inset-0 object-cover object-bottom w-full h-full pointer-events-none"
            src="/static/images/bg-countdown.jpg"
            alt="Background"
            role="presentation"
            aria-hidden
          />
          <div className="container">
            <div className="row">
              <div className="col col--12 sm:col--10 sm:offset--1 md:col--8 md:offset--2">
                {isEnded ? (
                  <div className="flex justify-center">
                    <Button kind="fill" endIcon={LogoMetamask} size="lg">
                      Connect your wallet
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="fluid-text-0 text-center">The registration starts on the 27th of July at 1PM CET.</p>
                    <Countdown counter={counter} />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
