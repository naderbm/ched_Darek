import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import arLang from './entries/ar-Ar';
import frLang from './entries/fr-FR';

const AppLocale = {
  fr: frLang,
  en: enLang,
  ar: arLang,
};
addLocaleData(AppLocale.fr.data);
addLocaleData(AppLocale.ar.data);
addLocaleData(AppLocale.en.data);

export default AppLocale;
