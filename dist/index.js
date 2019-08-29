"use strict";

var base_api = "https://motus-express.herokuapp.com";

function post(path, values) {
  fetch("".concat(base_api, "/").concat(path), {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: values
  });
}

function motusjs() {
  var userid = document.querySelector('meta[name="motustracker"]').content;

  if (userid) {
    console.log('MotusJS initialized');
  } else {
    console.log('MotusJS failed to run. Failed to find meta tag.');
  }

  document.querySelector('form').addEventListener('submit', function (e) {
    var form = e.target;
    var values = Object.values(form).reduce(function (obj, field) {
      obj[field.name] = field.value;
      return obj;
    }, {});
    post("clubos/".concat(userid), JSON.stringify(values));
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  motusjs();
});