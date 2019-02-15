new Vue({
  el: '#show-modal',
  data: {
    isActive: false,
    message: "Welcome, "
  },
  methods: {
    expense: function () {
      this.isActive = true;
    },
    close: function () {
      this.isActive = false;
    },
    removes: function (id) {
      postData('/' + id, {
          answer: 42
        })
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));

      function postData(url = ``, data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "reload", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
              "x-csrf-token": csrfToken()
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
          .then(response => response.json()); // parses response to JSON
      }
    }
  }
});