import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './HomeContainer/HomeContainer';
import SignupContainer from './SignupContainer/SingupContainer';
import DefaultLayout from '../components/layout/DefaultLayout/DefaultLayout';
import { Result, Button } from 'antd';

const RootContainer = () => {
  return (
    <Switch>
      <DefaultLayout exact path="/" component={HomeContainer} />
      <DefaultLayout exact path="/signup" component={SignupContainer} />
      <Route
        path="*"
        render={props => (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" style={{ margin: 0 }} onClick={() => props.history.push('/')}>
                Back Home
              </Button>
            }
          />
        )}
      />
    </Switch>
  );
};

export default RootContainer;
