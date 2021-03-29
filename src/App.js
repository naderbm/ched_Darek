import React, { Suspense, useEffect, useState } from 'react';
import GlobalIntlProvider from './utils/GlobalIntl';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import logo from './assets/logo.svg';
import 'moment/locale/ar-tn';
import { store, persistor } from './store';
import moment from 'moment';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDidUpdate } from './hooks/useDidUpdate';

const RootContainer = React.lazy(() => import('./containers/RootContainer'));

function App() {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'ar');

  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (!localStorage.getItem('locale')) {
      localStorage.setItem('locale', 'ar');
      setLocale(localStorage.getItem('locale'));
    }
    if (localStorage.getItem('locale') === 'ar') moment.locale('ar-tn');
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense
          fallback={
            <div>
              <img style={{ width: '40vw', marginLeft: '30vw', marginTop: '30vh' }} src={logo} alt="logo" />
            </div>
          }
        >
          <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
            <GlobalIntlProvider>
              <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
                <Route path="/" component={RootContainer} />
              </BrowserRouter>
            </GlobalIntlProvider>
          </IntlProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
