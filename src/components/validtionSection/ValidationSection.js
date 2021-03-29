import React from 'react';
import classes from './validationsection.module.scss';
import qrcodeTest from '../../assets/imgs/qrcode.png';
import { Button, Row } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import IntlMessages from '../../helpers/IntlMessages';

const ValidationSection = ({ qrcode, comeBacktoForm, erreur }) => {
  const lang = localStorage.getItem('locale');
  return (
    <div className={classes.wrapper}>
      <p
        className={classes.goback}
        onClick={comeBacktoForm}
        style={
          lang === 'ar' ? { textAlign: 'right', cursor: 'pointer' } : { textAlign: 'left', cursor: 'pointer' }
        }
      >
        <ArrowLeftOutlined style={{ padding: '0.5vw' }} />
        <IntlMessages id="form.generate" />
      </p>
      <div className={classes.content}>
        <p className={classes.title}>
          <IntlMessages id="autorisation.title" />{' '}
        </p>

        <p classes={classes.pragraph}>
          <IntlMessages id="autorisation.pragraph" />
        </p>
        <img src={qrcode} alt="qrcode" className={classes.qrcode} />
        <Button className={classes.button} type="primary" icon={<DownloadOutlined />} size={'large'}>
          <a style={{ color: 'white' }} href={qrcode} download>
            <IntlMessages id="button.download" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ValidationSection;
