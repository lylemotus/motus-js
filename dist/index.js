"use strict";

function post(body, endpoint) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(body));
}

function motusjs() {
  var userid = document.querySelector('meta[name="motustracker"]').content;

  if (userid) {
    console.log('MotusJS initialized');
  } else {
    console.log('MotusJS failed to run. Failed to find meta tag.');
  }

  document.querySelector('form.mt-clubos').addEventListener('submit', function (e) {
    var form = e.target;
    var values = Object.values(form).reduce(function (obj, field) {
      obj[field.name] = field.value;
      return obj;
    }, {});
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  motusjs();
});