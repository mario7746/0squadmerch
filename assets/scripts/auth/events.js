'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const onSignUp = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  console.log(data);
  if(data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure);
  } else {
    ui.passwordsDontMatch();
  }
};

const onSignIn = function (event) {
  $('.wrongCred').text('');
  let data = getFormFields(event.target);
  event.preventDefault();
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure);
};

const onChangePassword = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  api.changePassword(data)
    .then(ui.passwordChangeSuccess)
    .catch(ui.passwordChangeFailure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure);
};


const addHandlers = () => {
  ui.checkForUser();
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('click', onSignOut);
};

module.exports = {
  addHandlers,
};
