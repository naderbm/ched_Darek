import axios from 'axios';

// here you can change your api baseurl
const BaseURL = process.env.REACT_APP_API_URL || 'https://api-chedarek.wereact.co/';
//localhost:8000
//https://api-covid19.wereact.co/
//https://api-chedarek.wereact.co/

export let authorizationBearer = null;

export const setAuthorizationBearer = token => {
  authorizationBearer = token;
};

function axiosRequest(method, baseURL, url, params, headers) {
  console.log('method', method);
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      timeout: 300000,
      ...params,
      headers: {
        ...headers,
      },
    })
      .then(
        payload => {
          resolve({ data: payload.data, code: payload.status });
        },
        payload => {
          if (payload.response) {
            const { response } = payload;
            if (response.status >= 400 && response.status < 500) {
              resolve(response.data);
            } else {
              reject(response);
            }
          } else {
            reject(payload);
          }
        }
      )
      .catch(e => {
        throw e;
      });
  });
}
/* ------ Request POST ------ */
export function axiosPost(url, params, timeout = null) {
  let p = {
    sendToken: true,
    data: {},
    headers: {},
  };

  if (params) {
    p = { ...p, ...params };
  }
  setAuthorizationBearer(localStorage.getItem('token'));
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }

  return axiosRequest('POST', BaseURL, url, reqParams, headers);
}

/* ------ Request PUT ------ */
export function axiosPut(url, params, timeout = null) {
  setAuthorizationBearer(localStorage.getItem('token'));
  let p = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PUT', BaseURL, url, reqParams, headers);
}

/* ------ Request PATCH ------ */
export function axiosPatch(url, params, timeout = null) {
  setAuthorizationBearer(localStorage.getItem('token'));
  let p = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PATCH', BaseURL, url, reqParams, headers);
}

/* ------ Request GET ------ */
export function axiosGet(url, params, timeout = null) {
  setAuthorizationBearer(localStorage.getItem('token'));
  let p = { sendToken: true, params: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('GET', BaseURL, url, reqParams, headers);
}

/* ------ Request DELETE ------ */
export function axiosDelete(url, params, timeout = null) {
  let p = { sendToken: true, headers: {}, ...params };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('DELETE', BaseURL, url, reqParams, headers);
}

/* ------ Request POST files ------ */
export function axiosPostFilesData(url, params, timeout = 60000) {
  const p = {
    sendToken: true,
    form: {},
    headers: {},
    ...params,
  };
  const { headers } = p;

  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('POST', BaseURL, url, reqParams, headers);
}
