'use strict';

function sendContactForm() {
  var emailAddress = getFormFieldInformation('contactForm', 'inputEmail');
  var name = getFormFieldInformation('contactForm', 'inputName');
  var topic = getFormFieldInformation('contactForm', 'inputTopic');
  var text = getFormFieldInformation('contactForm', 'inputText');

  sendContactInformationToServer(buildJson(emailAddress, name, topic, text));
}

function sendAuthenticationInformation(){
  alert('called');
  var username = getFormFieldInformation('loginForm', 'email');
  var password = getFormFieldInformation('loginForm', 'password');
  alert(username + ' ' + password);
}

function getFormFieldInformation(form, inputField) {
  return document.forms.[form][inputField].value;
}

function buildJson(emailAddress, name, topic, text) {
  var json = {
    "emailAddress": emailAddress,
    "name": name,
    "topic": topic,
    "text": text
  };

  return json;
}

function sendContactInformationToServer(json) {
  $.ajax({
    type : 'POST',
    url : 'contactMe/new',
    contentType : 'application/json; charset=utf-8',
    dataType : 'json',
    async : false,
    data : JSON.stringify(json),
    success : function(data) {
      navigateToRequestedID('contactSend');
    }
  });
}