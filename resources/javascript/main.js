'use strict';

function sendContactForm() {
  var emailAddress = getFormFieldInformation('contactForm', 'inputEmail');
  var name = getFormFieldInformation('contactForm', 'inputName');
  var topic = getFormFieldInformation('contactForm', 'inputTopic');
  var text = getFormFieldInformation('contactForm', 'inputText');

  sendContactInformationToServer('contactMe/new', buildJson(emailAddress, name, topic, text), 'contactSend');
}

function getAuthenticationValues(){
  var json = {
    "username": getFormFieldInformation('loginForm', 'email'),
    "password": getFormFieldInformation('loginForm', 'password')
  };
  sendContactInformationToServer('authentication', json, 'adminArea');
}

function getFormFieldInformation(form, inputField) {
  return document.forms[form][inputField].value;
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

function sendContactInformationToServer(url, json, navigateTo){

  var user = json.username;
  var password = json.password;
  alert('after pass');
  $.get('/userusername', function(jd) {
    alert('fdsg');
  });
  // $.getJSON(
  //         '/user?username',
  //         //'user?username=' + user + "&password=" + password,
  //         function(data) {
  //           alert('inside...');
  //           if (jQuery.isEmptyObject(data)) {
  //             //setErrorClassForInputFields('#loginEmailInput');
  //             //setErrorClassForInputFields('#loginPasswordInput');
  //             return;
  //           }
  //           sessionStorage.setItem('username', data.userName);
  //           sessionStorage.setItem('password', password);
  //           $("#navigationTabsList")
  //               .append(
  //                   '<li id="myRegistration">'
  //                       + '<a onclick="navigateToRequestedID(\'myRegistration\');">Meine Anmeldung</a></li>');
  //           navigateToRequestedID('myRegistration');
  //           hideOrShowDivs("#navbarRightWhenLoggedIn", true);
  //           hideOrShowDivs("#navbarRightToLogin", false);
  //           $('#loginEmailInput').val('');
  //           $('#loginPasswordInput').val('');
  //           $('#username').text(email); 
  //         });

}


// function sendContactInformationToServer(url, json, navigateTo) {
//   $.ajax({
//     type : 'POST',
//     url : url,
//     contentType : 'application/json; charset=utf-8',
//     dataType : 'json',
//     async : false,
//     data : JSON.stringify(json),
//     success : function(data) {
//       if(data == true) {
//         $('#blog-navbar').append('<li id="adminArea">' +
//           '<a onclick="navigateToRequestedID(\'adminArea\');">Admin-Panel</a></li>');
//         navigateToRequestedID(navigateTo);
//         alert('break');
//       }
//     }
//   });
// }


// $("#navigationTabsList")
//                 .append(
//                     '<li id="myRegistration">'
//                         + '<a onclick="navigateToRequestedID(\'myRegistration\');">Meine Anmeldung</a></li>');
//             navigateToRequestedID('myRegistration');
//             hideOrShowDivs("#navbarRightWhenLoggedIn", true);
//             hideOrShowDivs("#navbarRightToLogin", false);