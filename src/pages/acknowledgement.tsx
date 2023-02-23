import Footer from 'components/Footer';
import Header from 'components/Header';

const OurStoryPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container flex justify-center">
          <div className="relative pb-[16%] acknowledge-box-wrapper">
            <section className="acknowledge-box">
              <img className="relative acknowledge-box-img" src={`/static/images/successTick.png`} alt="success-icon" />
              <div>
                <p className="success-msg text-white">THANK YOU FOR SIGNING UP!</p>
                <p className="success-msg text-white">
                  IN YOUR EMAIL YOU WILL RECEIVE DETAILS ABOUT YOUR ITEMS <br />
                  YOU WILL GET NOTIFIED VIA EMAIL ONCE YOUR ITEMS ARE READY TO BE REDEEMED <br />
                  CHECK OUT YOUR ITEMS IN YOUR WALLET HERE!
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OurStoryPage;
