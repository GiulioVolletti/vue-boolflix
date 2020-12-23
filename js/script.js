console.log("hello world");
var flixApp = new Vue (
  {
    el: "#wrapper",
    data:{
      textSearch: "",
      arraySearch:[],

    },
    methods:{
      findCast: function(cast_id, number, tipe){

        axios
          .get( "https://api.themoviedb.org/3/" + tipe + "/" + cast_id + "/credits" ,{
            params:{
              api_key: "4a59e1623a8f16134b5fe205c4d4923e",
            }
          }
        ).then(
          (element3) => {
            const arrayNew = [];
            // console.log(element3.data.cast);
            for (var i = 1; i <= 5; i++) {
              var object = {
                name: element3.data.cast[i].name
              }
              arrayNew.push(object)


            }
            this.arraySearch[number].cast = arrayNew


            this.$forceUpdate();
            // console.log(arrayNew);
            console.log(this.arraySearch);


          }
        );
      },

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
                  // console.log(element.data.results);
                  this.arraySearch = element.data.results

                  this.arraySearch.forEach((item, index) => {

                    // console.log(item);
                    // console.log(index);
                    this.findCast(item.id, index, "movie")
                  });
                  // console.log(this.arraySearch);
                  this.$forceUpdate();
                }
              );

          axios
            .get( "https://api.themoviedb.org/3/search/tv/",{
              params:{
                api_key: "4a59e1623a8f16134b5fe205c4d4923e",
                query: this.textSearch,
                language: "it-IT",
              }
            }
            )
              .then(
                (element2) => {


                  for (var i = 0; i < element2.data.results.length; i++) {

                    this.arraySearch.push(element2.data.results[i])
                    
                  }
                  // console.log(element2.data.results);




                  console.log(this.arraySearch);
                  this.$forceUpdate();
                }
              );


        };


        this.textSearch = ""
      },

    },


  }
);
