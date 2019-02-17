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
    removes: function () {
      postData('dashboard/add', {
          answer: 42
        })
        .then(data => {
          //  close the modal
          this.close();


        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));

      function postData(url = ``) {

        //  Bring in the form data and create form params to send
        const data = new URLSearchParams();
        for (const pair of new FormData(document.getElementById('new_item'))) {
          data.append(pair[0], pair[1]);
        }

        console.log(document.getElementById('_csrf').value);

        //  Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            //cache: "reload", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
              //"Content-Type": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            referrer: "*client", // no-referrer, *client
            body: data, //  body data type must match "Content-Type" header
          })
          .then(response => response.json()); //  parses response to JSON
      }
    }
  }
});