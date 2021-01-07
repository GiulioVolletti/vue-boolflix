console.log("hello world");
var flixApp = new Vue (
  {
    el: "#wrapper",
    data:{
      textSearch: "",
      arraySearch:[],
      arrayTelefilm: [],
      filmGenre: [],
      genreSelected: "all",

    },
    created: function (){

      // genre array
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list",{
          params:{
            api_key: "4a59e1623a8f16134b5fe205c4d4923e",
            language: "it-IT"
          }
        }
      ).then(
        (element) => {
          this.filmGenre = element.data.genres
        }
      )
    },
    methods:{

      genreSelection: function (arrayElement){
        var arraySelectionNew = [];
        for (var i = 0; i < this.filmGenre.length; i++) {
          if (arrayElement.includes(this.filmGenre[i].id)) {
            arraySelectionNew.push(this.filmGenre[i].name)
          };
        };
        return arraySelectionNew
      },

      genreID: function (idGenre){
        for (var i = 0; i < this.filmGenre.length; i++) {
          if (this.filmGenre[i].id == idGenre) {
            return this.filmGenre[i].name
          }
        }
      },

      // findcast tv
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
            // console.log(this.arraySearch);
          }
        );
      },

      // findCast telefilm
      findTelefilmCast: function(cast_id, number){
        axios
          .get( "https://api.themoviedb.org/3/tv/" + cast_id + "/credits",{
            params: {
              api_key: "4a59e1623a8f16134b5fe205c4d4923e",
            }
          }
        ).then(
          (element3) => {
            const arrayNew2 = [];
            if (element3.data.cast.length >= 5) {
              for (let i = 0; i < 5; i++) {
                let object = {
                  name: element3.data.cast[i].name
                };
                arrayNew2.push(object);
              }
            }
            this.arrayTelefilm[number].cast = arrayNew2;
            this.$forceUpdate();
          }
        )
      },

      // search telefilm and/or tv
      searchClick: function() {

        this.arrayTelefilm = [];
        // console.log(this.textSearch);
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

                    this.arrayTelefilm.push(element2.data.results[i])
                  };
                  // console.log(element2.data.results);
                  this.arrayTelefilm.forEach((item, index) => {
                    this.findTelefilmCast(item.id, index)
                  });

                  this.arraySearch = this.arraySearch.concat(this.arrayTelefilm)

                  // console.log(this.arraySearch);
                  this.$forceUpdate();
                }
              );

        };
        this.textSearch = ""
      },

    },

  }
);
