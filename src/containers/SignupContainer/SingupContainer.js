import React, { useEffect, useState, useRef } from 'react';
import signupActions from '../../redux/signup/SignupRequestRedux';
import { useHistory } from 'react-router-dom';
import SignupForm from '../../components/singupform/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import classes from './signupcontainer.module.scss';
import IntlMessages from '../../helpers/IntlMessages';
import { notification } from 'antd';
import { injectIntl } from 'react-intl';

const SignupContainer = ({ intl }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [erreur, setErreur] = useState('');
  const errorRef = useRef(redux.signup);

  useEffect(
    () => {
      if (redux.signup.loaded && redux.signup !== errorRef.current) {
        // setOpen(false);
        setErreur('');
        history.push('/');
        notification.success({
          message: intl.formatMessage({ id: 'signup.success' }),
        });
      }
      if (redux.login.loaded) history.push('/');
      if (redux.signup.error && redux.signup !== errorRef.current)
        setErreur(<IntlMessages id="erreur.something" />);
      // errorRef.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.signup.loaded, redux.signup.error]
  );
  const sendRequestSingup = values => {
    console.log('values', values);
    let obj = {
      cin: values.cin,
      password: values.password,
      confirmPassword: values.confirmPassword,
      firstName: values.firstName,
      lastName: values.lastName,
      governorate: values.governorate,
      gender: values.gender,
      nationality: 'tunisian',
      adress: values.adress,
      delegation: values.delegation,
      phone: values.phone,
    };
    dispatch(signupActions.signupRequest(obj));
  };
  return (
    <div className={classes.wrapper}>
      <SignupForm erreur={erreur} sendRequest={sendRequestSingup} />
    </div>
  );
};

export default injectIntl(SignupContainer);
//  <SignupForm erreur={erreur} sendRequest={sendRequestSingup} />;
