import React from 'react';
import logo from '../../../../assets/logo.svg';
import '../header/scss/header.scss';
import LangDropdown from '../langDropdown/LangDropdown';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import IntlMessages from '../../../../helpers/IntlMessages';
import Navbar from '../../../navbar/Navbar';
import useCurrentWitdh from '../../../../hooks/useCurrentWidth';
import user from '../../../../assets/user.png';
import { Link, useHistory } from 'react-router-dom';
const Header = ({ openmodal, login, signout }) => {
  const screenWidth = useCurrentWitdh();
  const history = useHistory();

  const menu = (
    <Menu style={{ marginTop: '-30%' }}>
      <Menu.Item onClick={signout} key="0">
        <p>Déconnexion</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {screenWidth > 768 && (
        <div>
          <div className="header_wrapper">
            <div className="dropdown_wrapper">
              <QuestionCircleOutlined className="help_icon" />
              <LangDropdown className="langDropdaown" />
            </div>
            <img src={logo} alt="logo" onClick={() => history.push('/')} />
            {login.loaded ? (
              <div className="buttons_wrapper">
                <Dropdown overlay={menu} trigger={['click']}>
                  <div className={'circle_icon'}>
                    {' '}
                    <img
                      src={user}
                      alt="user"
                      // onClick={signout}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#fbfbfb',
                        // borderRadius: '50%',
                        backgroundSize: '50px',
                        width: '21px',
                        height: '25px',
                      }}
                    />{' '}
                  </div>
                </Dropdown>

                {/* <DownOutlined /> */}
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '13px',
                    fontSize: '1.5vw',
                    marginBottom: 0,
                    marginTop: '2px',
                  }}
                >
                  {login?.response?.firstName}
                </p>
              </div>
            ) : (
              <div className="buttons_wrapper">
                <Button
                  onClick={() => openmodal(true)}
                  type="primary"
                  size="large"
                  className="button_se_connecter"
                >
                  <IntlMessages id="button.login" />
                </Button>

                <Button
                  onClick={() => openmodal(false)}
                  type="link"
                  size="large"
                  className="button_sinscrire"
                >
                  <IntlMessages id="button.register" />
                </Button>
              </div>
            )}
          </div>
          <Navbar />
        </div>
      )}
      {screenWidth <= 768 && (
        <div className="header_mobile">
          <div className="logo_wrapper">
            <img src={logo} alt="logo" onClick={() => history.push('/')} />
          </div>
          <div className="header_buttons">
            <Navbar
              login={login}
              logout={signout}
              openmodal={login => {
                openmodal(login);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
