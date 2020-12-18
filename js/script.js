console.log("hello world");

var flixApp = new Vue (
  {
    el: "#wrapper",
    data:{
      textSearch:"",

    },
    methods:{
      searchClick: function() {
        console.log(flixApp.textSearch);
      }

    },
  }
);
