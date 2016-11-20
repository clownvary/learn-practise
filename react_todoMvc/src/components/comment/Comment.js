/**
 * Created by wangyan on 16/9/6.
 */
'use strict';
import style from '../../assets/style.less';
// var converter = new Showdown.converter();
class CommentBox extends React.Component {
    
    constructor(props)
    {
       super(props);
        this.state={data:[]};
    }
    onSubmit({author='none',text='none'})
    {
        var comment={'author':author,'text':text};
        //这一步没有实现,需要服务器支持
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });


    }
    _loadCommentsFromServer()
    {
        $.ajax({
            url:this.props.url,
            dataType:'json',
            success:function (d) {
                this.setState({data:d});
            }.bind(this),
            error:function (xhr,status,err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        console.log('shouldComponentUpdate');
        return true;
    }
    componentWillReceiveProps(nextProps)
    {
        console.log('WillReceiveProps');
    }
    componentWillUnmount()
    {
        console.log('willunmount');
    }
    componentWillUpdate(nextProps, nextState)
    {
        console.log('willupdate');

    }
    componentDidUpdate(nextProps, nextState)
    {
        console.log('didupdate');

    }
    componentWillMount()
    {
        console.log('willmout');

    }
    componentDidMount()
    {
        console.log('didmout');
        this._loadCommentsFromServer();

        setInterval(()=>{this._loadCommentsFromServer();},this.props.pollInterval);
    }
    render() {

        return(<div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.onSubmit.bind()}/>
            </div>);
    }
}
class CommentList extends React.Component {

    render()
    {
        var commentNodes = this.props.data.map(function (comment,index) {
            return (
                <Comment comment={comment} key={index}>
                </Comment>
            );
        });
        return (
            <div className={[style.commentList,'test'].join(' ')}>
                {commentNodes}
            </div>
        );
    }

}
class CommentForm extends React.Component {
     submitd(e)
     {
         e.preventDefault();
         // console.log('in');
         //React.findDOMNode(this.refs.author).value.trim();
         let author=this.refs.author.value.trim();
         let content=this.refs.content.value.trim();
         if(!author||!content)
         {
             return;
         }
         // this.props.onCommentSubmit({author: author, text: content});
         this.refs.author.getDOMNode().value = '';
         this.refs.content.getDOMNode().value = '';

     }
    render() {
        return (
            <form className="commentForm" onSubmit={this.submitd}>
                <input type="text" placeholder="Your name" ref="author"  className="dd" data-myn="ddd" aria-at="ss"/>
                <input type="text" placeholder="content" ref="content"/>
                <input type="submit" value="post"/>

            </form>
        );
    }
}
class Comment extends React.Component {
    render() {
       // var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.comment.author}
                </h2>
                <p>
                    {this.props.comment.text}
                </p>
            </div>
        );
    }
}
export {CommentBox, CommentList, CommentForm,Comment};