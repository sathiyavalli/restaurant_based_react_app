import React, { Component } from 'react';
import '../App.css';
import image01 from './images/image_3.jpg';

class WebContent extends React.Component {
	restData;

    constructor(props) {
        super(props);

        this.onChangecityId = this.onChangecityId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            cityId: '',
            name: '',
            message:'',
            output:'',
            error:null,
            isLoaded: false,
      		data: [],
      		jlength:''
        }
          
    }


    // Form Events
    onChangecityId(e) {
        this.setState({ cityId: e.target.value });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
  
    onSubmit(e) {
        e.preventDefault()
        const cityId = this.state.cityId;
        const name = this.state.name;
        if(name != " " && cityId != ""){
        this.setState({
            cityId: '',
            name: '',
            message:'Data saved sucessfully.',
            isLoaded:true
        })
          let flash =  document.getElementsByClassName("alert-success")[0];
          flash.style.display = "block";
          setTimeout(function(){ flash.setAttribute(
          "style", "display:none;transition: display 8s ease-in;"); });

          return fetch("https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q="+name+"&start=0&count=50",{
    	 'method':'GET',
    	headers:{
    	'user-key':'87e52a3aed2978f12ba76200bad44abf',
    	 'Accept': 'application/json',
    	},
    })
      .then(res => {
      	return res.json()
      	
      })
      .then(response => this.setState({data:response.restaurants,jlength:response.results_shown,isLoaded:false}))
      .catch(error => {
      	console.log("error");
      });	
        }
         else if(name == " " || cityId == ""){
            this.setState({
              message:"Fill the required form field"
            })
             let flash =  document.getElementsByClassName("alert-danger")[0];
             flash.style.display = "block";
             setTimeout(function(){ flash.setAttribute(
             "style", "display:none;transition: display 4s ease-in;"); });
         }
          
    }

    componentWillMount() {
    	this.userData = JSON.parse(localStorage.getItem('rest'));
    	const cityId = this.state.cityId;
        const name = this.state.name;
        
  }
    
  
    
	render() {
		        const { data } = this.state;
		        const results = this.state.jlength;
		        let shown;
		        if(results > 0){
		        	shown = true;
		        }
		        else{
		        	shown = false;
		        }
      return (
			<div className="container-fluid intro-content">
				<div className="alert alert-success alert-dismissible" id="success">{this.state.message}
                 </div>
                  <div className="alert alert-danger alert-dismissible" id="success">{this.state.message}
                  </div>
			 	 <div className="row">&nbsp;</div>
			 	 <div className="row">&nbsp;</div>
			 	 <div className="row">&nbsp;</div>
				 <div className="row">
					<div className="col-md-6">
						<h2>
							Hungry?
						</h2>
						<h3>
							Search your favourite foods here!
						</h3>
						<form className="form-inline" onSubmit={this.onSubmit}>
						  <div className="form-check mb-2 mr-sm-2">
						   <select className="form-control form-control-lg col-12" id="select_id" value={this.state.cityId} onChange={this.onChangecityId}>
								<option value="4">Bengaluru</option>
								<option value="3" >Mumbai</option>
								<option value="1">Delhi</option>
								<option value="6">Hyderabad</option>
								<option value="5">Pune</option>
							</select>
						  </div>								  
  						  <div className="input-group mb-2 mr-sm-2">
   							<input type="text" className="form-control form-control-lg col-12" id="getText" value={this.state.name} onChange={this.onChangeName} />
  						  </div>
  						    <button type="submit" className="btn btn-primary mb-2 btn-lg" id="getMessage">Submit</button>
  						       {this.state.isLoaded && <Spinner />}
					    </form>
				    </div>
					<div className="col-md-6 image-nopadding">
						<img alt="Bootstrap Image Preview" src={image01} className="img-fluid"/>
					</div>
				   </div>
				   <div className="row">
				   		<h5 className="col-6 offset-3 mb-4">{shown ? results : 'No'} results shown</h5>
				   </div>
				     
			         {this.state.data.map((item,id) => 
			             <DataRow key = {id} data = {item} /> )}
			 </div>
		);
   }
}
/*spinner component*/
class Spinner extends React.Component {
	render(){
		return(
			<div class="text-center ml-2">
  				<div class="spinner-border" role="status">
    				<span class="sr-only">Loading...</span>
  				</div>
			</div>
			);
	}
}
class DataRow extends React.Component {
  render() {
	return (
	<div className="row">
	  <div className="restaurant_value col-6 offset-3 mb-4">
		<div className="col-9 float-left">
			<h4 style={{color:"mediumslateblue"}}>{this.props.data.restaurant.name}</h4>
			<div>{this.props.data.restaurant.location.locality}<br/><span>{this.props.data.restaurant.location.address}</span></div>
			<div>{this.props.data.restaurant.cuisines}</div>
			<div>{this.props.data.restaurant.currency}<span>{this.props.data.restaurant.average_cost_for_two}</span></div>
		</div>
		<div className="col-2 float-right">
			<h5 className="p-3 col-8 offset-2 mt-1" style={{background:"mediumpurple"}}>{this.props.data.restaurant.user_rating.aggregate_rating}</h5>
			<div className="px-4 col-12">{this.props.data.restaurant.user_rating.rating_text}</div>
		</div>
	  </div>
	</div>
	);
  }
}
export default WebContent;
