import React, { useState } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './scss/langDropdown.scss';

const LangDropdown = props => {
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('locale') || 'ar');
  const [isvisible, setVisible] = useState(false);
  const langs = [
    { lang: 'ar', label: 'ع' },
    { lang: 'fr', label: 'Fr' },
    { lang: 'en', label: 'En' },
  ];

  const menu = (
    <Menu>
      {langs.map(e => {
        return (
          <Menu.Item key={e.lang}>
            <span
              onClick={() => {
                setSelectedLang(e.lang);
                localStorage.setItem('locale', e.lang);
                window.location.reload();
              }}
            >
              {e.label}
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown visible={isvisible} overlay={menu} placement="bottomLeft" className={props.className}>
      <Button className="lang_button">
        <div
          onClick={() => {
            setVisible(!isvisible);
          }}
        >
          {' '}
          {selectedLang === 'ar' ? 'ع' : selectedLang}
          <CaretDownOutlined style={{ color: '#015eff' }} />
        </div>
      </Button>
    </Dropdown>
  );
};

export default LangDropdown;
