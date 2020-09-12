import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Link } from 'react-router-dom';



let $this;
class Home extends Component {
	constructor(props){
		super(props);
		const redirectfrom = this.props.location.redirectfrom;
		if(redirectfrom ==='login'){
			window.location.reload();
		}
		$this = this;
		this.state = {posts:[], keyword:'', tags:[], alltags:[], page:1, limit:5}
	}
	componentDidMount(){		
		this.getPosts()
		this.getTags()
		document.addEventListener('scroll', this.trackScrolling);
		//document.getElementById('Loading').style.display = "none";
	}
	componentWillUnmount(){
		document.removeEventListener('scroll', this.trackScrolling);
	}
	trackScrolling(){
		const wrappedElement = document.getElementById('root');		
		if($this.isBottom(wrappedElement)){
			const nextpage = $this.state.page+1;
			$this.setState({
				page : nextpage
			});
			document.removeEventListener('scroll', $this.trackScrolling);
			document.getElementById('Loading').style.display = "block";
			setTimeout(function(){
				$this.getPosts();
			}, 500)
		}
	}
	isBottom(el){
		return el.getBoundingClientRect().bottom <= window.innerHeight;
	}
	getTags(){
		axioApi.get('tags').then((res) => {
				$this.setState({
						alltags : res.data
				})
		});
	}
	tagsSelectChange = (selectedtag) => {
			$this.setState({ tags : selectedtag, posts:[], page:1 });
			setTimeout(function(){			
			$this.getPosts();
			},500);
	}
	getPosts(){
		const selectTagsIds=$this.state.tags.map(function(t){
			return t.value;
		});		
		const filter = {
			keyword : $this.state.keyword,
			tags : selectTagsIds.toString(),
			page : $this.state.page,
			limit : $this.state.limit
		};						
		axioApi.get('posts?'+qs.stringify(filter)).then((res) => { 
			const postdatas = $this.state.posts.concat(res.data);
			$this.setState({
				posts : postdatas
			})
			document.getElementById('Loading').style.display = "inline";
			setTimeout(function(){
				document.addEventListener('scroll', $this.trackScrolling);
			},1000)
		});
	}
	tabRows(){
		if($this.state.posts instanceof Array){
			return $this.state.posts.map(function(post, i){
				return <PostList post={post} key={i} />
			})		
		}
	}

	changeKeyword(e){		
		$this.setState({
			keyword : e.target.value, posts:[], page:1
		})
		setTimeout(function(){			
			$this.getPosts()
		}, 500)		
	}
  render() {
    return (
      	<div id="HomeView">
			  
					<div className="row" >
							<div className="col-md-3">
									<br/>
									<input type="text" onBlur={this.changeKeyword} className="form-control" placeholder="Search..." />	
									<br/>
									<img src="../pic7.jpg" alt="guestbook"/>		
							</div>		
					</div>
					<div className="row">						
							<div className="col-md-12">
									<br/>
									{this.tabRows()}
									<div id="Loading">Loading...</div>					
							</div>
					</div>
			</div>
    );
  }
}
export default Home;


class PostList extends Component{
	
	showTags(){
		return this.props.post.tags.map(function(t, i){
			return <span key={i} className="badge badge-info">{t.title}</span>
		})
	}
	render(){
		return(

			<div className="row">
					 
				<table className="table">
				<thead>
						<tr>
						<th scope="col">Author Name</th>
						<th scope="col">Title</th>
						<th scope="col">Message</th>
						<th></th>
						</tr>
				</thead>
				<tbody>
					<tr className="alert alert-info"> 
					<td >{(this.props.post.author)? this.props.post.author.name : ''}</td>
							<td >{this.props.post.title}</td>
							{this.showTags()}												
							<td >{this.props.post.description}</td>
							<td><Link to={"post-detail/"+this.props.post._id} className="btn btn-primary">Show all Replies &raquo; </Link></td>
					</tr>
				</tbody>
					</table>
				
					
					
			</div>
			
			
			
		)
	}
}
