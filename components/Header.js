import React, { Component } from 'react';
import '../App.css';

class Header extends React.Component {
	render() {
      return (
		<div className="container-fluid">
		  <div className="row">
		      <div className="col-md-12">
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				 
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span className="navbar-toggler-icon"></span>
					</button> <a className="navbar-brand" href="#">LOGO</a>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="navbar-nav">
							<li className="nav-item active">
								 <a className="nav-link" href="#">Home</a>
							</li>
						</ul>
					
						
					</div>
				</nav>
			</div>
		 </div>
	  </div>
		);
    }
  }
export default Header;
