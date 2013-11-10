'use strict';

$(function() {
  var url = window.location.hash;
  var requestedSite = url.substring(url.indexOf('#')+1);
  loadNavbar();

  if(requestedSite !== '') {
    navigateToRequestedID(requestedSite);
  }
});

function navigateToRequestedID(elementID) {
  var htmlPath = buildHtmlPath(elementID);
  setMainContentAndActiveFlag(elementID, htmlPath);
}

function buildHtmlPath(elementID) {
  return elementID + '.html';
}

function setMainContentAndActiveFlag(elementID, htmlPath) {
  loadNewHtmlContentFromFile(htmlPath);
  setActiveFlag(elementID);
}

function loadNewHtmlContentFromFile(htmlPath) {
  $('#mainContentContainer').load(htmlPath);
}

function setActiveFlag(elementID) {
  $('.navbar li').removeClass('active');
  document.getElementById(elementID).className = 'active';
}

function loadNavbar() {
  $('#blog-navbar').load('../html/navbar.html');
}