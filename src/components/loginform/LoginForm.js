import React from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from './loginform.module.scss';
import IntlMessages from '../../helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import { loginTypes } from '../../redux/login/LoginRequestRedux';

const LoginForm = ({ intl, sendRequest, erreur }) => {
  const currentLanguage = localStorage.getItem('locale');
  const validateMessages = {
    required: intl.formatMessage({
      id: 'login.input.required',
    }),
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
  };
  const onFinish = values => {
    console.log('Received values of form: ', values);
    sendRequest(values);
  };
  return (
    <>
      <p className={classes.title}>
        <IntlMessages id="login.title" />{' '}
      </p>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        {' '}
        <p className={classes.label}>
          <IntlMessages id="login.cin" />
        </p>
        <Form.Item
          name="cin"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'login.cin.required',
              }),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className={classes.icon} />}
            placeholder={intl.formatMessage({ id: 'login.cin' })}
          />
        </Form.Item>
        <p className={classes.label}>
          <IntlMessages id="login.password" />
        </p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'login.password.required',
              }),
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className={classes.icon} />}
            type="password"
            placeholder={intl.formatMessage({
              id: 'login.password',
            })}
          />
        </Form.Item>
        <Form.Item>
          {' '}
          <p className={classes.err}>{erreur}</p>
          <a className={classes.link}>
            <IntlMessages id="login.forgettenPassword" />
          </a>
          <a
            className={classes.link}
            style={
              currentLanguage === 'ar'
                ? { position: 'absolute', left: 0 }
                : { position: 'absolute', right: 0 }
            }
          >
            <IntlMessages id="button.register" />
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ position: 'absolute', backgroundColor: '#015eff', margin: 0 }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            <IntlMessages id="button.login" />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default injectIntl(LoginForm);
