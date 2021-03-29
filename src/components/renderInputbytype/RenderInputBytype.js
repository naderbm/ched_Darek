import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button, InputNumber, TimePicker, Row, Col, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import classes from './renderform.module.scss';
import IntlMessages from '../../helpers/IntlMessages';
import { injectIntl } from 'react-intl';

const lang = localStorage.getItem('locale');

const DelegationOptions = deligation => {
  return deligation?.map(el => {
    return (
      <Select.Option value={el._id} style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}>
        {lang === 'ar' ? el.details.NAME_EN_AR : el.details.NAME_EN}
      </Select.Option>
    );
  });
};

const ReactComp = props => {
  const getDelegations = async id => {
    const result = await axios.get(`https://api-chedarek.WEREACT.CO/delegation/${id}`);
    let array = Object.entries(result.data).map(el => {
      return el[1];
    });
    setDeligation(array);
  };
  const [deligation, setDeligation] = useState([]);
  const returnInputBytype = (elementType, placeholder, options, row) => {
    switch (elementType) {
      case 'Input':
        return <Input style={{ width: row ? '98%' : '' }} placeholder={placeholder} />;
      case 'InputPassword':
        return <Input.Password style={{ width: row ? '106' : '' }} placeholder={placeholder} />;
      case 'Radio':
        return <Radio>{placeholder}</Radio>;
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
              if (typeof el === 'object') {
                return placeholder === props.intl.formatMessage({ id: 'placeholder.sexe' }) ? (
                  <Select.Option
                    value={el.value}
                    style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
                  >
                    {el.name}
                  </Select.Option>
                ) : (
                  <Select.Option
                    value={el._id}
                    style={lang === 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
                  >
                    {placeholder === 'exitreason' ? (
                      <div>{lang === 'ar' ? el.titleAr : el.title}</div>
                    ) : (
                      <div
                        onClick={() => {
                          getDelegations(el._id);
                          props.form.resetFields(['delegation']);
                        }}
                      >
                        {lang === 'ar' ? el.nameAr : el.name}
                      </div>
                    )}
                  </Select.Option>
                );
              } else return <Select.Option value={el}>{el}</Select.Option>;
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
          // Can not select days before today and today
          console.log('date', moment(Date.now()).add(3, 'days'));
          // console.log('data1', current < moment().endOf('day'));
          return current && current < moment().endOf('day') && current > moment(Date.now()).add(3, 'days');
          // current && current < moment(current).add(3, 'days'),
        }
        return (
          <DatePicker
            inputReadOnly
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            placeholder={placeholder}
          />
        );
      case 'Number':
        return <InputNumber />;

      case 'Timepicker':
        return (
          <TimePicker
            inputReadOnly
            format="HH:mm"
            hideDisabledOptions
            // disabledHours={() => pastHours(form.getFieldValue('ds'))}
            placeholder={placeholder}
          />
        );

      case 'Textarea':
        return <Input.TextArea style={{ width: '100vw' }} className="textarea_width" />;

      default:
        return <></>;
    }
  };
  const formsRender = props.forms.map((element, index) => {
    if (Array.isArray(element)) {
      return (
        <Row key={index}>
          {element.map(obj => {
            return (
              <Col key={obj.elementConfig.name} lg={12} md={24} sm={12} xs={24}>
                <>
                  {' '}
                  {/* <p className={classes.label}>
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
      return (
        <>
          <p className={classes.label}>
            {props.intl.formatMessage({
              id: `${element.elementConfig.label} `,
            })}
          </p>
          <Form.Item
            name={element.elementConfig.name}
            // label={props.intl.formatMessage({
            //   id: `${element.elementConfig.label} `,
            // })}
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
  });
  return formsRender;
};

export default injectIntl(ReactComp);
