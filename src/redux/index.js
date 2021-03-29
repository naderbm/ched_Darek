import { combineReducers } from 'redux';
import { reducer as startup } from './startup/StartupRedux';
import { reducer as login } from './login/LoginRequestRedux';
import { reducer as governorates } from './governorates/GovernoratesRequestRedux';
import { reducer as exitreasons } from './exitreasons/ExitreasonsRequestRedux';
import { reducer as signup } from './signup/SignupRequestRedux';
import { reducer as generateqr } from './generateQrcode/GenerateQrcodeRedux';
import { reducer as curfew } from './curfew/GetcurfewRequestRedux';
import { reducer as steper } from './steper/SteperRedux';

export default combineReducers({
  curfew,
  steper,
  startup,
  generateqr,
  login,
  governorates,
  exitreasons,
  signup,
});
