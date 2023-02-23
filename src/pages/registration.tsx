import Footer from 'components/Footer';
import Header from 'components/Header';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { register } from '../components/Api/AuthCRUD';

const registrationSchema = Yup.object().shape({
  firstname: Yup.string().required('Required*').trim(),
  surname: Yup.string().required('Required*').trim(),
  email: Yup.string().required('Required*').trim(),
  password: Yup.string().required('Required*').trim(),
  phone: Yup.string().min(8, 'Minimum 8 symbols').required('Required*').trim(),
  country: Yup.string().required('Required*').trim(),
  street: Yup.string().required('Required*').trim(),
  nr: Yup.string().required('Required*').trim(),
  zip_code: Yup.string().required('Required*').trim(),
  city: Yup.string().required('Required*').trim(),
  confirm_password: Yup.string()
    .trim()
    .required('Required*')
    .min(8, 'Minimum 8 symbols')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
});

const OurStoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setDisable] = useState(false);

  // begin::code call api of registration from ../components/Api/AuthCRUD;
  const formik = useFormik({
    initialValues: {
      firstname: '',
      surname: '',
      email: '',
      password: '',
      phone: '',
      country: '',
      street: '',
      nr: '',
      zip_code: '',
      city: '',
      confirm_password: '',
    },
    validationSchema: registrationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setDisable(true);
      setTimeout(() => {
        register(
          values.firstname,
          values.surname,
          values.email,
          values.password,
          values.phone,
          values.country,
          values.street,
          values.nr,
          values.zip_code,
          values.city
        )
          .then(() => {
            setLoading(false);
            setDisable(false);
            router.push('/acknowledgement');
          })
          .catch(() => {
            setLoading(false);
            setSubmitting(false);
            setDisable(false);
          });
      }, 1000);
    },
  });

  return (
    <>
      <Header />

      <main>
        <div className="container flex flex-col justify-center">
          {/* begin::register amd bg image code*/}
          <div className="relative pb-[44%]">
            <img
              className="absolute top-[-15%] left-0 w-full h-auto"
              src={`/static/images/register_bg.png`}
              alt="Watches"
            />
            <div className="absolute w-full bottom-[0%] left-0">
              <div className="container relative text-center">
                <h1 className="fluid-text-8 font-bold uppercase text-white">REGISTER</h1>
              </div>
              <section className="text-white text-center">
                <div className="fluid-text-0">CONNECT YOUR METAMAST WALLET TO STORE YOUR ITEMS</div>
                <div className="registration-text mt-4">
                  TO WITHDRAW YOUR ITEM TO YOUR METAMAST ACCOUNT,
                  <Link href="/registration">
                    <a className="a-link">CLICK HERE</a>
                  </Link>
                </div>
              </section>
              <div className="mt-8 text-center">
                <button className="btn text-white fw-bold go-to-wallet">GO TO WALLET</button>
              </div>
            </div>
          </div>

          {/* begin::register form code*/}
          <section className="registration-box mt-8">
            <div>
              <div className="text-white">
                <h2 className="fluid-text-2 font-bold uppercase box-heading">SIGN UP</h2>

                <Link href="/login">
                  <a className="a-link">ALREADY HAVE ACCOUNT? LOGIN HERE</a>
                </Link>
              </div>
              <div className="mt-6">
                {/* begin::form submit */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mr-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            placeholder="FIRST NAME"
                            className="input-field w-full"
                            {...formik.getFieldProps('firstname')}
                          />
                          {formik.touched.firstname && formik.errors.firstname && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.firstname}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            placeholder="SURNAME"
                            className="input-field w-full"
                            {...formik.getFieldProps('surname')}
                          />
                          {formik.touched.surname && formik.errors.surname && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.surname}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-3 pt-0">
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
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          placeholder="PHONE NUMBER"
                          className="input-field w-full"
                          {...formik.getFieldProps('phone')}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-error">
                                {formik.errors.phone}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          placeholder="COUNTRY/REGION"
                          className="input-field w-full"
                          {...formik.getFieldProps('country')}
                        />
                        {formik.touched.country && formik.errors.country && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-error">
                                {formik.errors.country}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-8">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="mb-3 col-span-2 pt-0">
                          <input
                            type="text"
                            placeholder="STREET"
                            className="input-field w-full"
                            {...formik.getFieldProps('street')}
                          />
                          {formik.touched.street && formik.errors.street && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.street}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            placeholder="NR."
                            className="input-field w-full"
                            {...formik.getFieldProps('nr')}
                          />
                          {formik.touched.nr && formik.errors.nr && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.nr}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            placeholder="ZIP CODE"
                            className="input-field w-full"
                            {...formik.getFieldProps('zip_code')}
                          />
                          {formik.touched.zip_code && formik.errors.zip_code && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.zip_code}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            placeholder="CITY"
                            className="input-field w-full"
                            {...formik.getFieldProps('city')}
                          />
                          {formik.touched.city && formik.errors.city && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-error">
                                  {formik.errors.city}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 pt-0">
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
                      <div className="mb-3 pt-0">
                        <input
                          type="password"
                          placeholder="CONFIRM PASSWORD"
                          className="input-field w-full"
                          {...formik.getFieldProps('confirm_password')}
                        />
                        {formik.touched.confirm_password && formik.errors.confirm_password && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-error">
                                {formik.errors.confirm_password}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <button type="submit" className="btn text-white w-full mt-2 mb-4 submit-btn ">
                        {!loading && <span className="indicator-label">REGISTER</span>}
                        {loading && (
                          <span className="indicator-progress" style={{ display: 'block' }}>
                            Please wait...{' '}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OurStoryPage;
