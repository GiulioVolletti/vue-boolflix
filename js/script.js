
var flixApp = new Vue (
  {
    el: "#wrapper",
    data:{
      textSearch:"",
      arraySearch:[],

    },
    methods:{
      searchClick: function() {
        console.log(flixApp.textSearch);
      },

    },
    mounted: function() {
      console.log("hello world");

      axios
        .get( "https://api.themoviedb.org/3/search/movie/?api_key=4a59e1623a8f16134b5fe205c4d4923e&query=superman&language=it-IT")
          .then(
            (element) => {
              console.log(element.data.results);
              this.arraySearch = element.data.results

              console.log(this.arraySearch);
            }
          );
      // https://api.themoviedb.org/3/search/movie/

      // https://api.themoviedb.org/3/movie/550?api_key=4a59e1623a8f16134b5fe205c4d4923e

    },
  }
);
