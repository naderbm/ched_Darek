import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import governoratesActions from '../redux/governorates/GovernoratesRequestRedux';
import exitreasonsActions from '../redux/exitreasons/ExitreasonsRequestRedux';
import curfewActions from '../redux/curfew/GetcurfewRequestRedux';
import IntlMessages from '../helpers/IntlMessages';

const FormHandler = () => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const [governorates, setGovernorates] = useState([]);
  const [exitreasons, setExitreasons] = useState([]);
  const [curfew, setCurfew] = useState([]);
  function getHours() {
    let arr = [];
    if (redux.curfew?.response?.length > 0) {
      for (let i = redux.curfew?.response[0]?.exitMaxTime; i > 0; i--) {
        arr.push({ value: i });
      }
    }

    return arr;
  }

  useEffect(
    () => {
      dispatch(governoratesActions.governoratesRequest());
      dispatch(exitreasonsActions.exitreasonsRequest());
      dispatch(curfewActions.curfewRequest());
      setGovernorates(redux.governorates?.response);
      setExitreasons(redux.exitreasons?.response);
      setCurfew(getHours());
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(
    () => {
      if (redux.governorates.loaded) setGovernorates(redux.governorates?.response);
      if (redux.exitreasons.loaded) setExitreasons(redux.exitreasons?.response);
      if (redux.curfew?.loaded) setCurfew(getHours());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.governorates.loaded, redux.exitreasons.loaded]
  );

  const formConntectedMode = [
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.motifSortie',
          name: 'exitReason',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.motifSortie',
          options: exitreasons,
        },
      },
      {
        elementType: 'Datepicker',
        elementConfig: {
          label: 'form.dateSortie',
          name: 'startDate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.dateSortie',
        },
      },
    ],
    {
      elementType: 'Textarea',
      elementConfig: {
        label: 'form.autre',
        name: 'comment',
        rules: {
          required: true,
        },
        placeholder: 'placeholder.autre',
      },
    },
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.dureeSortie',
          name: 'endDate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.dureeSortie',
          options: curfew,
        },
      },
      {
        elementType: 'Timepicker',
        elementConfig: {
          label: 'form.horaireSortie',
          name: 'period',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.horaireSortie',
        },
      },
    ],
    [
      {
        elementType: 'Radio',
        elementConfig: {
          label: '',
          name: 'checkvoi',
          placeholder: 'placeholder.checkvoi',
          rules: {
            required: false,
          },
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.MatriculeVoiture',
          name: 'mdv',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.matriculeVoiture',
        },
      },
    ],
  ];

  const singupForm = [
    [
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.nom',
          name: 'lastName',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.nom',
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.prenom',
          name: 'firstName',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.prenom',
        },
      },
    ],
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.sexe',
          name: 'gender',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.sexe',
          options: [
            { value: 'homme', name: <IntlMessages id="form.sex.male" /> },
            { value: 'femme', name: <IntlMessages id="form.sex.female" /> },
          ],
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.cin',
          name: 'cin',
          rules: {
            required: true,
            min: 8,
            max: 8,
            message: <IntlMessages id="form.cin.validation" />,
          },
          placeholder: 'placeholder.cin',
        },
      },
    ],
    {
      elementType: 'Input',
      elementConfig: {
        label: 'form.adresse',
        name: 'adress',
        rules: {
          required: true,
          min: 5,
        },
        placeholder: 'placeholder.adresse',
      },
    },
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.gouvernerat',
          name: 'governorate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.gouvernerat',
          options: governorates,
        },
      },
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.delegation',
          name: 'delegation',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.delegation',
          options: 'delegation',
        },
      },
    ],
    [
      {
        elementType: 'Pays',
        elementConfig: {
          label: 'form.pays',
          name: 'pays',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.pays',
        },
      },
      {
        elementType: 'InputPassword',
        elementConfig: {
          label: 'form.password',
          name: 'password',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.password',
        },
      },
    ],
    [
      {
        elementType: 'InputPassword',
        elementConfig: {
          label: 'form.confirmpassword',
          name: 'confirmPassword',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.confirmpassword',
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.tel',
          name: 'phone',
          rules: {
            required: true,
            min: 8,
            max: 8,
            message: <IntlMessages id="form.tel.validation" />,
          },
          placeholder: 'placeholder.tel',
        },
      },
    ],
  ];
  //sep
  const forms = [
    [
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.nom',
          name: 'name',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.nom',
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.prenom',
          name: 'lastname',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.prenom',
        },
      },
    ],
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.sexe',
          name: 'sexe',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.sexe',
          options: [
            { value: 'homme', name: <IntlMessages id="form.sex.male" /> },
            { value: 'femme', name: <IntlMessages id="form.sex.female" /> },
          ],
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.cin',
          name: 'cin',
          rules: {
            required: true,
            min: 8,
            max: 8,
            message: <IntlMessages id="form.cin.validation" />,
          },
          placeholder: 'placeholder.cin',
        },
      },
    ],
    [
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.tel',
          name: 'phone',
          rules: {
            required: true,
            min: 8,
            max: 8,
            message: <IntlMessages id="form.tel.validation" />,
          },
          placeholder: 'placeholder.tel',
        },
      },
      {
        elementType: 'Pays',
        elementConfig: {
          label: 'form.pays',
          name: 'pays',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.pays',
        },
      },
    ],
    {
      elementType: 'Input',
      elementConfig: {
        label: 'form.adresse',
        name: 'adress',
        rules: {
          required: true,
          min: 5,
        },
        placeholder: 'placeholder.adresse',
      },
    },
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.gouvernerat',
          name: 'governorate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.gouvernerat',
          options: governorates,
        },
      },
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.delegation',
          name: 'delegation',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.delegation',
          options: 'delegation',
        },
      },
    ],
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.motifSortie',
          name: 'exitReason',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.motifSortie',
          options: exitreasons,
        },
      },
      {
        elementType: 'Datepicker',
        elementConfig: {
          label: 'form.dateSortie',
          name: 'startDate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.dateSortie',
        },
      },
    ],
    {
      elementType: 'Textarea',
      elementConfig: {
        label: 'form.autre',
        name: 'comment',
        rules: {
          required: true,
        },
        placeholder: 'placeholder.autre',
      },
    },
    [
      {
        elementType: 'Select',
        elementConfig: {
          label: 'form.dureeSortie',
          name: 'endDate',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.dureeSortie',
          options: curfew,
        },
      },
      {
        elementType: 'Timepicker',
        elementConfig: {
          label: 'form.horaireSortie',
          name: 'period',
          rules: {
            required: true,
          },
          placeholder: 'placeholder.horaireSortie',
        },
      },
    ],
    [
      {
        elementType: 'Radio',
        elementConfig: {
          label: '',
          name: 'checkvoi',
          placeholder: 'placeholder.checkvoi',
          rules: {
            required: false,
          },
        },
      },
      {
        elementType: 'Input',
        elementConfig: {
          label: 'form.MatriculeVoiture',
          name: 'mdv',
          rules: {
            required: false,
          },
          placeholder: 'placeholder.matriculeVoiture',
        },
      },
    ],
  ];
  return { forms, singupForm, formConntectedMode };
};
export default FormHandler;
