import React from 'react';
import InformationCard from '../informationcard/InformationCard';
import { injectIntl } from 'react-intl';
import classes from './informationgroupe.module.css';

const InformationGroupe = data => {
  //   const groupe = data.map(el => {
  //     return <InformationCard title={'Cas confirmés'} number={179} />;
  //   });

  return (
    <div className={classes.wrapper}>
      <InformationCard
        title={data.intl.formatMessage({
          id: 'actualites.casConfirme',
        })}
        number={data.data.cases}
      />
      <InformationCard
        title={data.intl.formatMessage({
          id: 'actualites.nouveauxCas',
        })}
        number={data.data.new_cases}
      />
      <InformationCard
        title={data.intl.formatMessage({
          id: 'actualites.casRetablis',
        })}
        number={data.data.total_recovered}
      />
      <InformationCard
        title={data.intl.formatMessage({
          id: 'actualites.deces',
        })}
        number={data.data.deaths}
      />
    </div>
  );
};

export default injectIntl(InformationGroupe);
