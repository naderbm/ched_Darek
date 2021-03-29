import React, { useEffect, useState, useRef } from 'react';
import { Route, useHistory } from 'react-router-dom';
import loginActions from '../../../redux/login/LoginRequestRedux';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginform/LoginForm';
import Header from './header/Header';
import SignModal from '../../signModal/SignModal';
import IntlMessages from '../../../helpers/IntlMessages';
import CarouselB from '../../Carousel/CarouselB';
import { notification } from 'antd';
import wereact from '../../../assets/logo-wereact.png';
import classes from './defaultlayout.module.scss';
import { injectIntl } from 'react-intl';
const DefaultLayout = ({ ...props }) => {
  const currentLanguage = localStorage.getItem('locale');
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [erreur, setErreur] = useState('');
  const errorRef = useRef(redux.login);

  useEffect(
    () => {
      if (redux.login.loaded && redux.login !== errorRef.current) {
        setOpen(false);
        setErreur('');
        notification.success({
          message: props.intl.formatMessage({ id: 'login.success' }),
        });
      }
      if (redux.login.error && redux.login !== errorRef.current)
        setErreur(<IntlMessages id="erreur.login" />);
      // errorRef.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.login.loaded, redux.login.error]
  );
  const sendRequest = values => {
    let obj = { cin: values.cin, password: values.password };
    dispatch(loginActions.loginRequest(obj));
  };

  function openTest(login) {
    if (!login) history.push('/signup');
    else setOpen(true);
  }
  return (
    <>
      <div className="header"></div>
      <div className="content">
        <div className={currentLanguage === 'ar' ? 'rtl' : 'ltl'}>
          <Header
            openmodal={login => {
              openTest(login);
            }}
            login={redux.login}
            signout={() => dispatch(loginActions.logout())}
          />
          <CarouselB />
          <Route {...props} />
        </div>
      </div>
      <div>
        <div className={classes.footerwereact}>
          <span>Powered by </span>
          <img className={classes.imgwereact} src={wereact} alt="wereact" />
        </div>
      </div>
      <SignModal
        content={<LoginForm erreur={erreur} sendRequest={sendRequest} />}
        visible={open}
        onCancel={() => setOpen(!open)}
      />
    </>
  );
};

export default injectIntl(DefaultLayout);
