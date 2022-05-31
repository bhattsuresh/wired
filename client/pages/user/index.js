import React from "react";
import {Table,Button,Dropdown,Modal} from "reactstrap";
import List from "./List";
import Form from "./Form";
import Detail from "./Detail";




const app = global.app;
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:true,
      add:false,
      edit:false,
      view:false,
      item:{},
      allUsers: [],
      isLoading: true,
      isError: false,
      showModal:false
    };
    //this.handleChange = this.handleChang.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  
  componentDidMount() {
 
    // get data from api
  }

  add = ()=>{
    this.setState({add:true});
    this.setState({list:false});
    this.setState({item:null});
  } 

  list = ()=>{
    this.setState({add:false});
    this.setState({list:true});
  }
  edit = (item) => {
    this.setState({add:true});
    this.setState({list:false});
    this.setState({item});
  } 

  view = (item) => {
    this.setState({view:true});
    this.setState({item});
  } 
toggleModal = (item)=>{
      this.setState({view:false});
  }

  delete = (data) => {
     if(!window.confirm("Are you sure to delete this"))
      return !1;
    
    this.setState({list:false});
     var api = '/delete-driver';
      
      data.admin_password='@B0ky00n#';
       var body = JSON.stringify(data);
      
       app.dataType='json';
       app.post(api,body).then(res=>{
        
            
              app.showToast('Success! '+res.message,'success');
              this.list()
         
      }).catch(err=>{
         app.showToast('Error! '+err,'danger');
      });
  }


  onFormSubmit = (e,data)=>{
      var api = `/admin/register-user`;
      console.log(e.target);
      var fd = new FormData(e.target);
      app.showToast('Please wait...');
       app.post(api,fd).then(res=>{
        if(res.success){
          app.showToast(`Success! ${res.message}`,'success');
          this.list();
        }
        else
           app.showToast(`Warning! ${res.message}`,'warning');  
             
      }).catch(err=>{
          app.showToast('Error! '+err,'danger');
      });
  }


  render() {
    let header = '';
    const { isError, isLoading } = this.state;

    if (isError) {
      return app.showMessage('Server data error. Check api url or internet connetion','danger');
    }

   

    if(this.state.list)
        header = (<> All Users
              <Button variant="success" style={{float:'right'}} onClick={this.add} >
                Add New
              </Button></>)
      else
        header = (<> Add/Edit User
              <Button variant="success" style={{float:'right'}} onClick={this.list} >
                Back
              </Button></>)
      
    return (
     
        <>
        
         <Button variant="success" style={{float:'right'}} onClick={this.list} >
                Back
              </Button>
          {this.state.list && <List view={this.view} edit={this.edit} delete={this.delete}/> }
          {this.state.add && <Form onFormSubmit={this.onFormSubmit} item={this.state.item}/> }
        
            {this.state.view && <Detail toggleModal={this.toggleModal}  onFormSubmit={this.onFormSubmit} item={this.state.item}/> }
        </>

    );
  }
}




export default User;
