

window.addEventListener("load", function(event) {
  // here is the Vue code

Vue.config.devtools = true;

Vue.component('amount-header',{
  props: ['amount'],
  template: `<p class="title"> {{ '$' + amount }}</p>`
});

Vue.component('budget-list', {
  props: ['budget'],
  template:`<div>
  <table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    <tr>
      <th></th>
      <th>date</th>
      <th>name</th>
      <th>category</th>
      <th>amount</th>
      <th>edit</th>
      <th></th>
    </tr>
  </thead>
  <tbody>

  <tr v-for="item in budget">
  <td width="5%"><i class="fas fa-bell"></i></td>
  <td>2/15/19</td>
  <td>
    <!-- item.name -->
   {{ item.name }}
  </td>
  <td>
    <!-- item.category-->
    {{ item.category }}
  </td>
  <td>$
    <!-- item.amount -->
    {{ item.amount }}
  </td>
  <td><a class="button is-small is-trash" href="#"><i class="fas fa-pencil-alt"></i></a></td>
  <td>
    <form id="remove_item">
      <input id="remover" type="hidden" name="_csrf" value="<%= csrfToken() %>">
      <input type="hidden" name="_id" value="{{item._id}}">
      <button class="is-trash" @click="$emit('deleteItems', item._id)"><i class="far fa-trash-alt"></i></button>
    </form>
  </td>
  </tr>
  </tbody>
  </table></div>`
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
    expenseModal: function () {
      this.isActive = true;
    },
    close: function () {
      this.isActive = false;
    },
    addItem: function () {
      postData('dashboard/add', {
          answer: 42
        })
        .then(data => {
          //  Close the modal
          this.close();
          //  Push new item to respective list
          data.budgetItem.expense ? this.expenses.push(data.budgetItem) : this.incomes.push(data.budgetItem);
         
          //  Clear the form data
          document.getElementById("new_item").reset(); 



        }) //  JSON-string from `response.json()` call
        .catch(error => console.error(error));

      function postData(url = ``) {

        //  Bring in the form data and create form params to send
        const data = new URLSearchParams();
        for (const pair of new FormData(document.getElementById('new_item'))) {
          data.append(pair[0], pair[1]);
        }

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
    deleteItem: function(item) {
      //  Delete chosen item
      

      //  Remove from the expenses array
      
      postData('dashboard/delete/' + item, {
        answer: 42
      })
      .then(data => {
        
        console.log('item removed, yay!');
      }) //  JSON-string from `response.json()` call
      .catch(error => console.error(error));

    function postData(url = ``) {

      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById('remove_item'))) {
        data.append(pair[0], pair[1]);
      }
     
      //  Default options are marked with *
      return fetch(url, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          //mode: "cors", // no-cors, cors, *same-origin
          //cache: "reload", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            //"Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          //referrer: "*client", // no-referrer, *client
          body: data, //  body data type must match "Content-Type" header
        })
        .then(response => response.json()); //  parses response to JSON
    }
    },
    gather: function () {
      getData('dashboard/gather')
        .then(response => {
          //  console.log(response);

          //  General setup for name, income and expense headers
          this.expense = response.expense;
          this.income = response.income;
          this.userName = response.user;

          //  Extract the budget items
          const list = response.result;
          list.forEach(item => {
            item.expense ? this.expenses.push(item) : this.incomes.push(item);
          });
        })
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
    },
    expenseList() {
      return this.expenses;
    },
    incomeList() {
      return this.incomes;
    }
  }
});

});