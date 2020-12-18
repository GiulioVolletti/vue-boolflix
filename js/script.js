
var flixApp = new Vue (
  {
    el: "#wrapper",
    data:{
      textSearch: "",
      arraySearch:[],

    },
    methods:{
      searchClick: function() {
        console.log(this.textSearch);
        if (this.textSearch != "") {
          axios
            .get( "https://api.themoviedb.org/3/search/movie/",{
              params:{
                api_key: "4a59e1623a8f16134b5fe205c4d4923e",
                query: this.textSearch,
                language: "it-IT",
              }
            }
            )
              .then(
                (element) => {
                  console.log(element.data.results);
                  this.arraySearch = element.data.results

                  console.log(this.arraySearch);
                }
              );

          this.textSearch = ""
        };
      },

    },

  }
);
