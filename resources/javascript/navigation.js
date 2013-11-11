'use strict';

$(function() {
  var url = window.location.hash;
  var requestedSite = url.substring(url.indexOf('#')+1);
  loadNavbar();

  hideOrShowDivs('#navbarRightWhenLoggedIn', false);

  if(requestedSite !== '') {
    navigateToRequestedID(requestedSite);
  }

  loadNewHtmlContentFromFile(buildHtmlPath('blogPostPanel'));
  getBlogPost('newest');
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