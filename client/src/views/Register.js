import React, { Component } from 'react';
import asioApi from './../axioConfig';
import qs from 'qs';
let $this;
class Register extends Component {

	constructor(props){
		super(props);
		$this = this;

		this.state = {email:'', password:'', name:''} 
	}

	handleNameChange(e){  
		$this.setState({
			name : e.target.value
		})
	}

	handleEmailChange(e){
		$this.setState({
			email : e.target.value
		})	
	}

	handlePasswordChange(e){
		$this.setState({
			password : e.target.value
		})	
	}

	handleSubmit(e){
		e.preventDefault(); // prevent to go page refresh

		const user = {email:$this.state.email, password:$this.state.password, name:$this.state.name}

		// send ajax with axio
		asioApi.post("user", qs.stringify(user)).then((res) => {
			 
			
			$this.props.history.push('/login'); // code for redirect login

			// lets run
		});
	}

  render() {
    return (
			<div>
				<br></br>
				<h2>Register</h2>
				<br/>
				<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input onChange={this.handleNameChange} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter email" />						
				</div>
				<div className="form-group">
					<label>Email address</label>
					<input onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />						
				</div>
				<div className="form-group">
					<label>Password</label>
					<input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
				</div>					
				<button type="submit"  className="btn btn-primary">Submit</button>	
				</form>
				<img src="../8.png"  alt="register" style={{marginLeft:"400px",height:"300px"}}/>	
			</div>		
    );
  }
}
export default Register;