import React from 'react';
import bg from '../../assets/imgs/bg.png';
import Icon from '../../assets/imgs/icon.png';
import classes from './signmodal.module.scss';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const SignModal = ({ visible, onCancel, content }) => {
  const currentLanguage = localStorage.getItem('locale');
  return (
    <Modal
      bodyStyle={{ maxWidth: '100%', overflow: 'hidden', borderRadius: '20px' }}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      className={currentLanguage === 'ar' ? 'rtl' : 'ltl'}
    >
      <div
        className={classes.imgWrapper}
        style={
          currentLanguage === 'ar'
            ? { top: '-32vh', right: '20%', position: 'relative' }
            : { top: '-32vh', left: '20%', position: 'relative' }
        }
      >
        <img
          style={
            currentLanguage === 'ar'
              ? {
                  position: 'relative',
                  zIndex: 1,
                  top: '157px',
                  right: '-37%',
                  borderRadius: '20px',
                  height: '280px',
                  width: '600px',
                }
              : {
                  position: 'relative',
                  zIndex: 1,
                  top: '157px',
                  left: '-37%',
                  borderRadius: '20px',
                  height: '280px',
                  width: '600px',
                }
          }
          className={classes.bg}
          src={bg}
          alt=""
        />
        <img src={Icon} alt="icon" className={currentLanguage === 'ar' ? classes.iconAr : classes.iconFr} />
      </div>
      {/* <img src={test} alt="icon" /> */}
      <div className={classes.content}>{content}</div>
    </Modal>
  );
};

export default SignModal;
