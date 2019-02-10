new Vue({
    el:'#show-modal',
    data:{
       isActive: false,
       message: "Welcome, "
    },
    methods: {
      expense: function() {
        this.isActive = true;
      },
      close: function() {
        this.isActive = false;
      }
    }
  });