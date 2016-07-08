// props are immutable: they are passed from the parent
// and are "owned" by the parent. To implement interactions,
// we introduce mutable state to the component.
// this.state is private to the component and can be changed
//  by calling this.setState(). When the state updates,
//  the component re-renders itself.
// render() methods are written declaratively as functions of
// this.props and this.state. The framework guarantees the UI
//  is always consistent with the inputs.

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
var Comment=React.createClass({
  render:function(){
    return(
      <div className="comment">
      <h2 className="commentAuthor">
      {this.props.author}</h2>
      {this.props.children}
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        );
      });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm=React.createClass({
  render:function(){
    return (
      <div className="commentForm">
      Hello! I am a commentForm.
      </div>
    );
  }
});
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox data={data} />,
   document.getElementById('content')
);
