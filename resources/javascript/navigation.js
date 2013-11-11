'use strict';

$(function() {
  var url = window.location.hash;
  var requestedSite = url.substring(url.indexOf('#')+1);
  loadNavbar();

  hideOrShowDivs('#navbarRightWhenLoggedIn', false);
  loadNewHtmlContentFromFile(buildHtmlPath('blogPostPanel'));

  if(requestedSite !== '') {
    getBlogPost(requestedSite);
  } else {
    getBlogPost('newest');
  }

});

function navigateToRequestedID(elementID) {
  var htmlPath = buildHtmlPath(elementID);
  if(elementID === 'blogPostPanel') {
    getBlogPost('newest');
    setMainContentAndActiveFlag('home', htmlPath);
  } else {
    setMainContentAndActiveFlag(elementID, htmlPath);
  }
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

function loadBlogEntry(elementID, html) {
  $(elementID).html(html);
}

function setActiveFlag(elementID) {
  $('.navbar li').removeClass('active');
  document.getElementById(elementID).className = 'active';
}

function loadNavbar() {
  $('#blog-navbar').load('../html/navbar.html');
}

function hideOrShowDivs(elementID, isVisible) {
  if (isVisible) {
    $(elementID).show();
  } else {
    $(elementID).hide();
  }
}