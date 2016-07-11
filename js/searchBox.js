var ResultItems=React.createClass({
  render:function(){
    console.log("L3 Poster"+this.props.Poster);
    console.log("L3 Title" +this.props.Title);
    return(
//<li>{this.props.searchResults.response.Director}</li>
<div>
<li>{this.props.Title}</li>
<li>{this.props.Year}</li>
<li>{this.props.Rated}</li>
<li>{this.props.Released}</li>
<li>{this.props.Genre}</li>
<li>{this.props.Runtime}</li>
<li>{this.props.Director}</li>
<li>{this.props.Writer}</li>
<li>{this.props.Actors}</li>
<li>{this.props.Plot}</li>
<li>{this.props.Language}</li>
<li>{this.props.Country}</li>
<li>{this.props.Awards}</li>
<li><img src= {this.props.Poster}/></li>
<li>{this.props.Metascore}</li>
<li>{this.props.imdbRating}</li>
<li>{this.props.imdbVotes}</li>
<li>{this.props.Type}</li>
<li>{this.props.Response}</li>
</div>

    );
  }
});

var Result=React.createClass({
  render:function(){
console.log("L12 type is " + typeof this.props.searchResults);
console.log("L13 string is " + JSON.stringify(this.props.searchResults));

    var resultItems=this.props.searchResults.map(function(result){
    console.log("L16 " + result.imdbID + " "+ result.Director );
    return <ResultItems key={result.imdbID}  Title= {result.Title}
    Year= {result.Year} Rated= {result.Rated} Released= {result.Released} Runtime= {result.Runtime}
    Genre= {result.Genre} Director={result.Director} Writer= {result.Writer} Actors= {result.Actors}
    Plot= {result.Plot} Language= {result.Language} Country={result.Country} Awards= {result.Awards}
    Poster= {result.Poster} Metascore= {result.Metascore} imdbRating= {result.imdbRating}
     imdbVotes= {result.imdbVotes} Type= {result.Type} Response= {result.Response} />

    });

console.log("L18 "+ {resultItems});
return(<div>{resultItems}</div>);
  }
});



var MovieApp=React.createClass({
getInitialState:function(){
  return{
    searchResults:[]
  };
},
showResults:function(response){
  console.log(response);
  this.setState({

    searchResults:[response]
  });
},

search:function(url){
$.ajax({
    type:"GET",
     dataType:'jsonp',
     url:url,
     success: function(response){
                this.showResults(response);
              }.bind(this)
   });
},

  render:function(){
  return(  <div>
    <Searchbox search={this.search}/>
    <Result searchResults={this.state.searchResults} />
    </div>
  );
  }
});


var Searchbox=React.createClass({

  createAjax:function(e){
    //alert("ajax calling");
    e.preventDefault();
    //console.log(this);
    var query=ReactDOM.findDOMNode(this.refs.query).value;
    //var query="sultan";
    var year=ReactDOM.findDOMNode(this.refs.year).value;
    //var year="2016";
  var category = ReactDOM.findDOMNode(this.refs.category).value;
  //  var category="full";
    var url='http://www.omdbapi.com/?t='+query+'&y='+year+'&plot='+category+'&r=json';
//var url='https://itunes.apple.com/search?term=fun';
    this.props.search(url)

  },
  handleChange: function() {
  },
  render:function(){

    return(
      <div id="searchbox">
      <form className=""  onSubmit={this.createAjax}>
      <input type="text" ref="query" placeholder="Search Your movie"  />
      <input type="text" ref="year" placeholder="Year" />
      <select ref="category">
                    <option value="short">short</option>
                    <option value="full">full</option>
                </select>
        <input type="submit" value="submit" />
        </form>
      </div>
    );
  }

});


ReactDOM.render(
  <MovieApp/>,
  document.getElementById('content')
);
