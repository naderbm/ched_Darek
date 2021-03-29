export function validateEmail(email) {
  if (!email) return 'Email pas trouvé';
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return '';
  }
  return 'Le format de l’email est invalide';
}

export function validatePassword(password) {
  const message = 'Votre mot de passe doit contenir';
  /* if (password.length < 6) return `${message} un minimum de 6 caractères`; */
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password) || password.length < 6 || !/(?=.*\d)/.test(password)) {
    return `${message} un minimum de 6 caractères et doit comporter au moins une lettre majuscule et une lettre minuscule`;
  }
  // if (!/(?=.*\d)/.test(password)) return `${message} au moins un chiffre!`;

  return '';
}

export function validateNom(firstName) {
  if (firstName !== '') {
    return '';
  }
  return 'Format invalide';
}
export function validatePrenom(firstName) {
  if (firstName !== '') {
    return '';
  }
  return 'Format invalide';
}
export function validateMessage(message) {
  if (message !== '') {
    return '';
  }
  return 'Format invalide';
}
export function validatePhone(phonenumber) {
  const phoneno = /^\d{8}$/;
  if (phonenumber.match(phoneno)) {
    return 'Valid';
  }
  return 'Unvalid';
}
