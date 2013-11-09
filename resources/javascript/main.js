'use strict';

function sendContactForm(emailData) {
  var emailAddress = getContactFormInformation('inputEmail');
  var name = getContactFormInformation('inputName');
  var topic = getContactFormInformation('inputTopic');
  var text = getContactFormInformation('inputText');

  sendContactInformationToServer(buildJson(emailAddress, name, topic, text));
}

function getContactFormInformation(inputField) {
  return document.forms.contactForm[inputField].value;
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
    url : 'http://localhost:8080/contactMe/new',
    contentType : 'application/json; charset=utf-8',
    dataType : 'json',
    async : false,
    data : JSON.stringify(json),
    success : function(data) {
      navigateToRequestedID('contactSend');
    }
  });
}