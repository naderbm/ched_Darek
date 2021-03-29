import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import steperActions from '../../redux/steper/SteperRedux';
import IntlMessages from '../../helpers/IntlMessages';
import './scss/navbar.scss';
import { Dropdown, Menu } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const Navbar = ({ openmodal, login, logout }) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const screenWidth = window.screen.width;

  return (
    <div>
      {screenWidth > 768 && (
        <div className="navbar_wrapper">
          <div className="accueil_link">
            <NavLink
              onClick={() => dispatch(steperActions.changeSteper(0))}
              to="/"
              activeClassName="active"
              exact
            >
              <IntlMessages id="navbar.accueil" />
            </NavLink>
          </div>
          <div className="actualites_link">
            <NavLink to="/Actualites" exact>
              <IntlMessages id="navbar.actualites" />
            </NavLink>
          </div>
          <div className="statistique_link">
            <NavLink to="/Statistique" exact>
              <IntlMessages id="navbar.statistique" />
            </NavLink>
          </div>
        </div>
      )}
      {screenWidth <= 768 && (
        <div>
          {isOpen ? (
            <CloseOutlined
              style={{ color: '#015eff' }}
              className="menu_icon"
              onClick={() => setOpen(!isOpen)}
            />
          ) : (
            <MenuOutlined
              style={{ color: '#015eff' }}
              className="menu_icon"
              onClick={() => setOpen(!isOpen)}
            />
          )}
          <div hidden={!isOpen} className="menu_wrapper">
            <Menu style={{ paddingBottom: 20, paddingTop: 10 }} selectable={false} mode="inline">
              <Menu.Item onClick={() => setOpen(false)}>
                <NavLink to="/" exact activeClassName="active">
                  <IntlMessages id="navbar.accueil" />
                </NavLink>
              </Menu.Item>
              <Menu.Item onClick={() => setOpen(false)}>
                <NavLink to="/Actualites" exact activeClassName="active">
                  <IntlMessages id="navbar.actualites" />
                </NavLink>
              </Menu.Item>
              <Menu.Item onClick={() => setOpen(false)}>
                <NavLink to="/Statistique" exact activeClassName="active">
                  <IntlMessages id="navbar.statistique" />
                </NavLink>
              </Menu.Item>
              <SubMenu key="sub1" title={<IntlMessages id="language.title" />}>
                <Menu.Item
                  key="ar"
                  onClick={() => {
                    localStorage.setItem('locale', 'ar');
                    setOpen(false);
                    window.location.reload();
                  }}
                  className="submenu_padding"
                >
                  <IntlMessages id="language.ar" />
                </Menu.Item>
                <Menu.Item
                  key="fr"
                  onClick={() => {
                    localStorage.setItem('locale', 'fr');
                    setOpen(false);
                    window.location.reload();
                  }}
                  className="submenu_padding"
                >
                  <IntlMessages id="language.fr" />
                </Menu.Item>
                <Menu.Item
                  key="en"
                  onClick={() => {
                    localStorage.setItem('locale', 'en');
                    setOpen(false);
                    window.location.reload();
                  }}
                  className="submenu_padding"
                >
                  <IntlMessages id="language.en" />
                </Menu.Item>
              </SubMenu>{' '}
              {login.loaded ? (
                <Menu.Item>{login.response?.firstName}</Menu.Item>
              ) : (
                <Menu.Item
                  onClick={() => {
                    openmodal(true);
                    setOpen(false);
                  }}
                >
                  <IntlMessages id="button.login" />
                </Menu.Item>
              )}{' '}
              {login.loaded ? (
                <Menu.Item
                  onClick={() => {
                    logout();
                  }}
                >
                  <IntlMessages id="button.logout" />
                </Menu.Item>
              ) : (
                <Menu.Item
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <NavLink to="/signup" exact activeClassName="active">
                    <IntlMessages id="button.register" />
                  </NavLink>
                </Menu.Item>
              )}
            </Menu>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
