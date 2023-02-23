import Footer from 'components/Footer';
import Header from 'components/Header';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login1 } from '../actions/index';
import { login } from '../components/Api/AuthCRUD';

// validation code
const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').trim(),
  password: Yup.string().required('Password is required').trim(),
});

const OurStoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setDisable] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setDisable(true);
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { token, data } }) => {
            dispatch(login1(token, data));
            setLoading(false);
            setDisable(false);
            setResponseStatus(null);
            router.push('/wallet');
          })
          .catch(err => {
            setLoading(false);
            setSubmitting(false);
            setDisable(false);
            setResponseStatus(err.response.data);
          });
      }, 1000);
    },
  });
  return (
    <>
      <Header />

      <main>
        <div className="container flex flex-col justify-center">
          <div className="relative pb-[30%]">
            <img
              className="absolute top-[-18%] left-0 w-full h-auto"
              src={`/static/images/register_bg.png`}
              alt="Watches"
            />

            <div className="absolute w-full bottom-[9%] left-0">
              <div className="container relative text-center">
                <h1 className="fluid-text-8 font-bold uppercase text-white">LOGIN</h1>
              </div>
            </div>
          </div>
          <section className="login-box">
            <span role="alert" className="text-error">
              {responseStatus}
            </span>
            <div>
              <div className="text-white">
                <h2 className="fluid-text-4 font-bold uppercase">LOG IN</h2>
                <Link href="/registration">
                  <a className="a-link">DON&apos;T HAVE AN ACCOUNT YET? CREATE HERE</a>
                </Link>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="mt-3">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="EMAIL"
                        className="input-field w-full"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-error">
                              {formik.errors.email}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="PASSWORD"
                        className="input-field w-full"
                        {...formik.getFieldProps('password')}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-error">
                              {formik.errors.password}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn text-white w-full mt-4 submit-btn ">
                    {!loading && <span className="indicator-label">SIGN IN</span>}
                    {loading && (
                      <span className="indicator-progress" style={{ display: 'block' }}>
                        Please wait...{' '}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OurStoryPage;
