import React from 'react';
import classes from './informationcard.module.css';

const InformationCard = ({ title, number }) => {
  return (
    <div className={classes.wrapper}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={classes.title}>{title}</span>
        {(title === 'وفاة' || title === 'Death' || title === 'Décés') && <br />}
        <span className={classes.number}>{number}</span>
      </div>
    </div>
  );
};

export default InformationCard;
