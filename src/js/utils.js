/* eslint-disable no-undef */

const utils = {};

utils.createDOMFromHTML = function (htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.upperCase = function (context) {
  return context.toUpperCase();
};

Handlebars.registerHelper('name', function (context) {
  context = context.slice(0, -4);
  let parts = context.split('_');
  parts = parts.slice(-2);
  let artist = parts.join(' ');
  return artist;
});

Handlebars.registerHelper('toString', function (context) {
  let str = context.join(', ').toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
});

export default utils;