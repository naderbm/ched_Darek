import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  InputNumber,
  TimePicker,
  Row,
  Col,
  DatePicker,
  Checkbox,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import localDatepickerAr from '../../lang/locales/localDatepickerAr.json';
import moment from 'moment';
import { DateDiff } from '../../utils/DaysDateDiff';
import classes from './form.module.scss';
import FormHandler from '../../common/form';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import axios from 'axios';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 22 },
};

// get the passed hours
const pastHours = currentDate => {
  const currentTime = moment(Date.now()).format('H');
  let arr = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5];
  if (DateDiff(currentDate?._d, Date.now()) === 0) {
    for (let i = currentTime; i > 5; i--) {
      arr.push(i);
    }
  } else if (DateDiff(currentDate?._d, Date.now()) < 0)
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  return arr;
};
const minutes = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
];
// form type generated

const FormInputs = props => {
  // validate msgs
  const validateMessages = {
    required: props.intl.formatMessage({
      id: 'login.input.required',
    }),
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
  };
  const [form] = Form.useForm();
  const { forms, formConntectedMode } = FormHandler();
  const [accomp, setAccomp] = useState(1);
  const [autre, setAutre] = useState(false);
  const [matricule, setMatricule] = useState(false);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState();
  const [deligation, setDeligation] = useState([]);
  const [formData, setFormdata] = useState({});
  const lang = localStorage.getItem('locale');
  // Form on click function

  const onFinish = values => {
    props.sendData(values);
  };
  const DelegationOptions = deligation => {
    return deligation?.map(el => {
      return (
        <Select.Option
          key={el}
          value={el._id}
          style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
        >
          {lang === 'ar' ? el.details.NAME_EN_AR : el.details.NAME_EN}
        </Select.Option>
      );
    });
  };
  const getDelegations = async id => {
    const result = await axios.get(`https://api-chedarek.WEREACT.CO/delegation/${id}`);
    let array = Object.entries(result.data).map(el => {
      return el[1];
    });
    setDeligation(array);
  };
  const returnInputBytype = (elementType, placeholder, options, row) => {
    switch (elementType) {
      case 'Input':
        return <Input style={{ width: row ? '102%' : '' }} placeholder={placeholder} />;
      case 'Radio':
        return <Checkbox onClick={() => setMatricule(!matricule)}>{placeholder}</Checkbox>;
      case 'Pays':
        return <Input value="Tunisia" disabled placeholder={placeholder} />;
      case 'Select':
        let selectoptions = options ? (
          options === 'delegation' ? (
            deligation.length > 1 ? (
              DelegationOptions(deligation)
            ) : (
              <></>
            )
          ) : options.length > 0 ? (
            options?.map(el => {
              // if (el === 'autre')
              //   return (
              //     <Select.Option value={el}>
              //       <div
              //         onClick={() => {
              //           setAutre(true);
              //         }}
              //       >
              //         {el}
              //       </div>
              //     </Select.Option>
              //   );
              // else
              if (typeof el === 'object') {
                return placeholder === props.intl.formatMessage({ id: 'placeholder.sexe' }) ||
                  placeholder === props.intl.formatMessage({ id: 'placeholder.dureeSortie' }) ? (
                  <Select.Option
                    key={el}
                    value={el.value}
                    style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
                  >
                    {placeholder === props.intl.formatMessage({ id: 'placeholder.dureeSortie' })
                      ? el.value + ' ' + props.intl.formatMessage({ id: 'value.heures' })
                      : el.name}
                  </Select.Option>
                ) : (
                  <Select.Option
                    key={el._id}
                    value={el._id}
                    style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
                  >
                    {placeholder === props.intl.formatMessage({ id: 'placeholder.motifSortie' }) ? (
                      <div
                        onClick={() => {
                          if (el.comment) setAutre(true);
                          else setAutre(false);
                        }}
                      >
                        {lang === 'ar' ? el.titleAr : el.title}
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          // setAutre(false);
                          getDelegations(el._id);
                          // form.setFieldsValue({ delegation: '' });
                          form.resetFields(['delegation']);
                        }}
                      >
                        {lang === 'ar' ? el.nameAr : el.name}
                      </div>
                    )}
                  </Select.Option>
                );
              } else {
                return (
                  <Select.Option
                    key={el}
                    value={el}
                    style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
                  >
                    {el}
                  </Select.Option>
                );
              }
            })
          ) : (
            <></>
          )
        ) : (
          <></>
        );

        return (
          <Select
            placeholder={
              options === 'delegation' ? <IntlMessages id="placeholder.delegation" /> : placeholder
            }
          >
            {selectoptions}
          </Select>
        );

      case 'Datepicker':
        function disabledDate(current) {
          return (
            moment(current).add(1, 'days') < moment().endOf('day') ||
            moment(current).diff(moment(Date.now()), 'days') > 7
          );
          // current && current < moment(current).add(3, 'days'),
        }
        return (
          <DatePicker
            locale={lang === 'ar' ? localDatepickerAr : ''}
            inputReadOnly
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            placeholder={placeholder}
            onChange={value => {
              setDates(value);
            }}
          />
        );
      case 'Number':
        return <InputNumber />;

      case 'Timepicker':
        return (
          <TimePicker
            className={classes.TimePicker}
            inputReadOnly
            format="HH:mm"
            disabledHours={() => pastHours(form.getFieldValue('startDate'))}
            disabledMinutes={selectedHour => {
              if (selectedHour === -1) {
                return minutes;
              } else {
                return [];
              }
            }}
            placeholder={placeholder}
          />
        );

      case 'Textarea':
        return <Input.TextArea style={{ width: '100vw' }} className="textarea_width" />;

      default:
        return <></>;
    }
  };

  // Forms Creator
  let formsTotreat = props.loginData.loaded ? formConntectedMode : forms;
  const formsRender = formsTotreat.map((element, index) => {
    if (Array.isArray(element)) {
      return (
        <Row key={index}>
          {element.map(obj => {
            if (!matricule && obj.elementConfig.name === 'mdv') {
              return <Col lg={12} md={24} sm={12} key={obj.elementConfig.name} xs={24}></Col>;
            } else
              return (
                <Col key={obj.elementConfig.name} lg={12} md={24} sm={12} xs={24}>
                  <>
                    {' '}
                    {/*  <p className={classes.label}>
                      {props.intl.formatMessage({
                        id: `${obj?.elementConfig?.label} `,
                      })}
                    </p> */}
                    <Form.Item
                      name={obj.elementConfig.name}
                      label={props.intl.formatMessage({
                        id: `${obj.elementConfig.label} `,
                      })}
                      rules={[obj.elementConfig.rules]}
                    >
                      {returnInputBytype(
                        obj.elementType,
                        props.intl.formatMessage({
                          id: obj.elementConfig.placeholder,
                        }),
                        obj.elementType === 'Select' ? obj.elementConfig.options : [],
                        false
                      )}
                    </Form.Item>
                  </>
                </Col>
              );
          })}
        </Row>
      );
    } else {
      if (!autre && element.elementType === 'Textarea') {
        return <></>;
      } else {
        return (
          <>
            {/* <p className={classes.label}>
              {props.intl.formatMessage({
                id: `${element.elementConfig.label} `,
              })}
            </p> */}
            <Form.Item
              name={element.elementConfig.name}
              label={props.intl.formatMessage({
                id: `${element.elementConfig.label} `,
              })}
              rules={[element.elementConfig.rules]}
            >
              {returnInputBytype(
                element.elementType,
                props.intl.formatMessage({
                  id: element.elementConfig.placeholder,
                }),
                element.elementType === 'Select' ? element.elementConfig.options : [],
                true
              )}
            </Form.Item>
          </>
        );
      }
    }
  });
  let formadd = [];
  for (let i = 0; i < accomp; i++) {
    formadd.push(
      <div className={classes.accompsection} key={i}>
        <span className={classes.accom}>
          <IntlMessages id="formadd.text" /> {+` ${i + 1} `} <IntlMessages id="formadd.title" />
          <PlusCircleOutlined
            onClick={() => (accomp < 3 ? setAccomp(accomp + 1) : console.log('max'))}
            className="plus_icon"
          />
        </span>
        {/* {i > 0 ? <h1>test</h1> : <></>} */}
        <Row style={{ marginTop: '5%' }}>
          <Col lg={12} md={24} sm={12} xs={24}>
            {/* <p className={classes.label}>
              {props.intl.formatMessage({
                id: `formadd.nom`,
              })}
            </p> */}
            <Form.Item
              name={[`accomp${i}`, 'firstName']}
              label={props.intl.formatMessage({
                id: 'formadd.nom',
              })}
              // rules={[{ required: true }]}
            >
              <Input
                placeholder={props.intl.formatMessage({
                  id: 'placeholderadd.nom',
                })}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={24} sm={12} xs={24}>
            {/*  <p className={classes.label}>
              {props.intl.formatMessage({
                id: `formadd.prenom`,
              })}
            </p> */}
            <Form.Item
              name={[`accomp${i}`, 'lastName']}
              label={props.intl.formatMessage({
                id: 'formadd.prenom',
              })}
              // rules={[{ required: true }]}
            >
              <Input
                placeholder={props.intl.formatMessage({
                  id: 'placeholderadd.prenom',
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        {/*  <p className={classes.label}>
          {props.intl.formatMessage({
            id: `formadd.lienParente`,
          })}
        </p> */}
        <Form.Item
          name={[`accomp${i}`, 'relationShip']}
          label={props.intl.formatMessage({
            id: 'formadd.lienParente',
          })}
          // rules={[{ required: true }]}
        >
          <Select
            placeholder={props.intl.formatMessage({
              id: 'placeholderadd.lienParente',
            })}
          >
            <Select.Option
              value="pére"
              style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
            >
              {props.intl.formatMessage({
                id: 'formadd.pere',
              })}
            </Select.Option>
            <Select.Option
              value="mére"
              style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
            >
              {' '}
              {props.intl.formatMessage({
                id: 'formadd.mere',
              })}
            </Select.Option>
            <Select.Option
              value="fils"
              style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
            >
              {' '}
              {props.intl.formatMessage({
                id: 'formadd.fils',
              })}
            </Select.Option>
            <Select.Option value="ami" style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}>
              {' '}
              {props.intl.formatMessage({
                id: 'formadd.ami',
              })}
            </Select.Option>
            <Select.Option
              value="épouse"
              style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
            >
              {' '}
              {props.intl.formatMessage({
                id: 'formadd.epouse',
              })}
            </Select.Option>
          </Select>
        </Form.Item>
      </div>
    );
  }

  return (
    <Form
      className={classes.wrapper}
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      {/* {formsRender} */}
      <div className={classes.firstrender}>{formsRender}</div>
      {formadd}
      <p className={classes.err}>{props.erreur}</p>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, lg: { offset: 18 }, xs: { offset: 9 } }}>
        <Button type="primary" htmlType="submit">
          <IntlMessages id="button.submit" />
        </Button>
      </Form.Item>
    </Form>
  );
};
export default injectIntl(FormInputs);
