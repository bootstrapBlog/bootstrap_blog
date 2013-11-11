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
    // "emailAddress": emailAddress,
    "name": name,
    "topic": topic,
    "text": text
  };

  return json;
}

function sendContactInformationToServer(url, json, navigateTo){

  var user = json.username;
  var password = json.password;
  var authData = {
    user: user,
    password: password
  };

  $.getJSON('/auth', authData, function(data) {
    if(jQuery.isEmptyObject(data)) {
      return ;
    }
    $("#blog-navbar").append('<li id="adminArea">' +
      '<a onclick="navigateToRequestedID(\'adminArea\');">Admin-Panel</a></li>');
    navigateToRequestedID('adminArea');
    hideOrShowDivs('#navbarRightWhenLoggedIn', true);
    hideOrShowDivs('#loginForm', false);
    $('#username').text(user);
  });
}

function realiseEnterButton(e) {
  var charCode = (typeof e.which === "13") ? e.which : e.keyCode;
  if(charCode === 13)
    getAuthenticationValues();
}

function logout() {
  hideOrShowDivs('#navbarRightWhenLoggedIn', false);
  hideOrShowDivs('#loginForm', true);
  location.reload();
}

function getBlogPost(blogPost) {
  $.getJSON('/blog/' + blogPost, function(blogData) {
    if(jQuery.isEmptyObject(blogData)) {
      return ;
    }
    loadBlogPost(blogData);
  });
}

function loadBlogPost(blogData) {
  loadBlogEntry('#blogPostPanelHeader', blogData.title);
  loadBlogEntry('#blogPostPanelBody', blogData.post);
  loadBlogEntry('#latestBlogPosts', blogData.title);
}