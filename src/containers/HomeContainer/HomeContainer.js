import React, { useEffect, useState, useRef } from 'react';
import classes from './homecontainer.module.css';
import axios from 'axios';
import { Steps, Row, Col, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import generateQrcodeActions from '../../redux/generateQrcode/GenerateQrcodeRedux';
import steperActions from '../../redux/steper/SteperRedux';
import FormInputs from '../../components/form/FormInputs';
import ValidationSection from '../../components/validtionSection/ValidationSection';
import InformationGroupe from '../../components/informationgroup/InforamtionGroupe';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import moment from 'moment';
import useCurrentWitdh from '../../hooks/useCurrentWidth';

const HomeContainer = props => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [open, setOpen] = useState(false);
  const [formData, setFormdata] = useState({});
  const [qrcode, setQrcode] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');
  const qrRef = useRef(redux.generateqr);

  const { Step } = Steps;
  const currentWidth = useCurrentWitdh();
  useEffect(
    () => {
      if (redux.generateqr.loaded && redux.generateqr !== qrRef.current) {
        dispatch(steperActions.changeSteper(1));
        setQrcode(redux.generateqr.response?.qrCode);
        setOpen(false);
        notification.success({
          message: props.intl.formatMessage({ id: 'qrcode.success' }),
        });
      }
      if (redux.generateqr.error && redux.generateqr !== qrRef.current)
        setErreur(<IntlMessages id="erreur.something" />);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.generateqr.loaded]
  );
  console.log('stper', redux.steper?.current);
  const sendData = values => {
    const startDate = moment(values.startDate._d).format('YYYY-MM-DD');
    const period = moment(values.period._d).format('hh:mm');
    const exitDate = startDate + 'T' + period;
    let companions = [];
    if (values?.accomp0) companions.push(values?.accomp0);
    if (values?.accomp1) companions.push(values?.accomp1);
    if (values?.accomp2) companions.push(values?.accomp2);

    let allInfos = {
      userInfo: {
        name: values.name + ' ' + values.lastname,
        cin: values.cin,
        phone: values.phone,
        adress: values.adress,
        governorate: values.governorate,
        pays: 'tunisia',
        delegation: values.delegation,
        car: values.mdv,
      },
      exitReason: values.exitReason,
      companions: companions,
      comment: values.comment,
      exitDate: exitDate,
      returnTime: values.endDate,
    };
    let loggedInfo = {
      exitReason: values.exitReason,
      exitDate: exitDate,
      returnTime: values.endDate,
      user: redux?.login?.response.id,
      companions: companions,
      comment: values.comment,
      car: values.mdv,
    };
    setFormdata(redux.login.loaded ? loggedInfo : allInfos);
    setOpen(true);
  };

  function sendRequest() {
    console.log('form', formData);
    dispatch(generateQrcodeActions.generateQrcodeRequest({ formData, login: redux.login.loaded }));
  }
  const steps = [
    {
      title: props.intl.formatMessage({
        id: 'steps.informations',
      }),
      content: <FormInputs erreur={erreur} loginData={redux.login} sendData={sendData} />,
    },
    {
      title: props.intl.formatMessage({
        id: 'steps.validation',
      }),
      content: (
        <ValidationSection qrcode={qrcode} comeBacktoForm={() => dispatch(steperActions.changeSteper(0))} />
      ),
    },
  ];

  useEffect(() => {
    async function hello() {
      const response = await axios.get(
        'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
        {
          headers: {
            'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
            'x-rapidapi-key': '6f61862533mshe64b4cb9d2f2eb1p1b04fejsne0435fe92117',
          },
        }
      );
      return response.data.countries_stat;
    }
    hello().then(data => {
      data.forEach(element => {
        if (element.country_name === 'Tunisia') {
          setLoading(false);
          setData(element);
        }
      });
    });
  }, []);
  return (
    <Row style={{ maxWidth: '100vw', overflow: 'hidden' }}>
      <Col lg={6} xs={24}>
        <p className={classes.actualite}>
          <IntlMessages id="actualites.title" />
        </p>
        {loading ? <Spin style={{ margin: '10vw' }} size="large" /> : <InformationGroupe data={data} />}
      </Col>
      <Col lg={18} xs={24}>
        <p className={classes.title}>
          <IntlMessages id="form.title" />
        </p>
        <Steps
          labelPlacement="vertical"
          style={
            currentWidth <= 991
              ? {
                  padding: '5%',
                  paddingLeft: '15%',
                  marginLeft: '2%',
                  marginRight: '2%',
                  backgroundColor: '#fbfbfb',
                  height: '80px',
                  width: '96%',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  paddingRight: '20%',
                }
              : {
                  padding: '5%',
                  paddingLeft: '15%',
                  marginLeft: '2%',
                  marginRight: '2%',
                  backgroundColor: '#fbfbfb',
                  height: '80px',
                  width: '96%',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  paddingRight: '20%',
                }
          }
          current={redux.steper.current}
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ paddingLeft: '5%' }}>
          {steps[redux.steper.current ? redux.steper?.current : 0].content}
        </div>
      </Col>
      <ConfirmationModal sendRequest={sendRequest} visible={open} onCancel={() => setOpen(!open)} />
    </Row>
  );
};

export default injectIntl(HomeContainer);
