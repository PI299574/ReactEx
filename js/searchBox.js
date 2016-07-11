var ResultItems=React.createClass({
  render:function(){
    console.log(this.props.Director);
    return(
      //<li>{this.props.searchResults.response.Director}</li>
<li> {this.props.Director}</li>
    );
  }
});

var Result=React.createClass({
  render:function(){
console.log("L12 type is " + typeof this.props.searchResults);
console.log("L13 string is " + JSON.stringify(this.props.searchResults));

  var resultItems=this.props.searchResults.map(function(result){
console.log("L16 " + result.imdbID + " "+ result.Director );
    return <ResultItems key={result.imdbID} Director={result.Director} />

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
