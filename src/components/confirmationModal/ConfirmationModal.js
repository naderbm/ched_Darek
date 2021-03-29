import React from 'react';
import classes from './confirmationmodal.module.scss';
import { Modal, Button, Row } from 'antd';
import IntlMessages from '../../helpers/IntlMessages';
import useCurrentWitdh from '../../hooks/useCurrentWidth';

const ConfirmationModal = ({ visible, onCancel, sendRequest }) => {
  const currentWidth = useCurrentWitdh();
  return (
    <Modal
      className={classes.wrapper}
      bodyStyle={{ minHeight: '20vh' }}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <p className={classes.text}>
        <IntlMessages id="modal.text" />
      </p>
      <Row className={classes.btns}>
        <Button
          onClick={onCancel}
          className={classes.annuler}
          style={currentWidth >= 1024 ? { top: '63px !important' } : {}}
        >
          <IntlMessages id="modal.cancel" />
        </Button>
        <Button onClick={() => sendRequest()} type="primary" className={classes.confirm}>
          <IntlMessages id="modal.submit" />
        </Button>
      </Row>
    </Modal>
  );
};

export default ConfirmationModal;
