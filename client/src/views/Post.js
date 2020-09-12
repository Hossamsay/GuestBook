import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPosts, deletePost } from './../redux/actions';

const mapStateToProps = state => {
    return{
        posts : state.postreducer.posts  // redux_step4 getting data from store and connect with view
    }
}

let $this;
class Post extends Component {
    constructor(props){
		super(props);
        $this = this; 
    }
   
	componentDidMount(){
        this.props.getPosts($this.props.loginuser);  // redux_step1 calling to actions
    }    
    async deletePost(id){
        const returndata = await $this.props.deletePost(id);
        if(returndata.data.message === "deleted"){
            $this.props.getPosts($this.props.loginuser);
        }else{
            alert("something error"); console.log(returndata);
        }
    }
    tabRows(){
        return $this.props.posts.map(function(post, i){
            return <tr key={i}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{(post.author)? post.author.name : ''}</td> 
                    <td>
                        <Link to={"/editPost/"+post._id}><button className="btn btn-info">Edit</button></Link><span> </span>
                        <Link to={"post-detail/"+post._id}><button className="btn btn-info">Reply</button></Link>     <span></span>
                                          
                        <button className="btn btn-danger" onClick={() => $this.deletePost(post._id)}>Delete</button></td>  
                        
                    </tr>;
        });
    }
          
  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post</h1>
            <Link className="nav-link" to='/create-post'><button className="btn btn-success">Create Post</button></Link> 
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Author</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.tabRows()}
                    
                    
                </tbody>
            </table>
            <hr/>
      	</div>
    );
  }
}
//export default Post;
export default connect(mapStateToProps, { getPosts, deletePost })(Post);