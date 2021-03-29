import React from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from './signupform.module.scss';
import IntlMessages from '../../helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import { loginTypes } from '../../redux/login/LoginRequestRedux';
import RenderInput from '../renderInputbytype/RenderInputBytype';
import formsConfig from '../../common/form';

const SignupForm = ({ intl, sendRequest, erreur }) => {
  const [form] = Form.useForm();
  const { singupForm } = formsConfig();
  // const renderform = renderInput(forms);
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
    <div className={classes.wrapper}>
      <p className={classes.title}>
        <IntlMessages id="signup.title" />{' '}
      </p>
      <Form
        layout="vertical"
        name="normal_login"
        className="signup-form"
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
      >
        <RenderInput forms={singupForm} form={form} />
        <p className={classes.err}>{erreur}</p>
        <Form.Item>
          <Button
            style={{ position: 'relative', backgroundColor: '#015eff', float: 'right', margin: 0 }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            <IntlMessages id="button.register" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default injectIntl(SignupForm);
