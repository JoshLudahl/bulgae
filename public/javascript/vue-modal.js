Vue.config.devtools = true;

Vue.component('amount-header',{
  props: ['amount'],
  template: `<p class="title"> {{ '$' + amount }}</p>`
});


var app = new Vue({
  el: '#show-modal',
  data: {
    isActive: false,
    message: "Welcome, ",
    userName: '',
    income: 0,
    expense: 0,
    expenses:[],
    incomes:[]
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

    },
    gather: function () {
      getData('dashboard/gather')
        .then(response => {
          console.log(response);

          //  General setup for name, income and expense headers
          this.expense = response.expense;
          this.income = response.income;
          this.userName = response.user;

          //  Extract the budget items
          const list = response.result;
          list.forEach(item => {
            item.expense ? this.expenses.push(item) : this.incomes.push(item);
          });


        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));

      function getData(url = ``) {

        //  Default options are marked with *
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            //cache: "reload", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
              //"Content-Type": "application/json",
              "Content-Type": "application/json",
            },
            referrer: "*client", // no-referrer, *client
            //body: data, //  body data type must match "Content-Type" header
          })
          .then(response => response.json()); //  parses response to JSON
      }
    }
  },
  mounted() {
    this.gather();
  },
  computed: {
    userTitle() {
      return this.userName;
    },
    exp() {
      return this.expense;
    },
    inc() {
      return this.income;
    }
  }
});