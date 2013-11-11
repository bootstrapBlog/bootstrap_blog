'use strict';

$(function() {
  var url = window.location.hash;
  var requestedSite = url.substring(url.indexOf('#')+1);
  loadNavbar();

  hideOrShowDivs('#navbarRightWhenLoggedIn', false);
  loadNewHtmlContentFromFile('#mainContentContainer', buildHtmlPath('blogPostPanel'));
  loadNewHtmlContentFromFile('#blog-carousel', buildHtmlPath('carousel'));
  if(requestedSite !== '') {
    getBlogPost(requestedSite);
  } else {
    getBlogPost('newest');
  }

});

function navigateToRequestedID(elementID) {
  hideOrShowDivs('#blog-carousel', true);
  var htmlPath = buildHtmlPath(elementID);

  if(elementID === 'blogPostPanel') {
    setMainContentAndActiveFlag('#mainContentContainer', elementID, htmlPath);
    getBlogPost('newest');
  } else {
    setMainContentAndActiveFlag('#mainContentContainer', elementID, htmlPath);
  }
}

function buildHtmlPath(elementID) {
  return elementID + '.html';
}

function setMainContentAndActiveFlag(containerToLoadInformationIn, elementID, htmlPath) {
  loadNewHtmlContentFromFile(containerToLoadInformationIn, htmlPath);
  setActiveFlag(elementID);
}

function loadNewHtmlContentFromFile(containerToLoadInformationIn, htmlPath) {
  $(containerToLoadInformationIn).load(htmlPath);
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