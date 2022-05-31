import React from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Dropdown } from "react-bootstrap";

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = { isLogin: false, user: {} }
  }
  componentDidMount() {
    var _token = localStorage.getItem('_token_wired');
    if (_token) {
      this.setState({ isLogin: !this.state.isLogin });
      this.setState({ user: JSON.parse(localStorage.getItem('_data_wired')) });

    }

  }

  handleLogout(){
    localStorage.removeItem('_token_wired');
    location.reload();
  }

  render() {
    


       return (<>
         <header className="header">
          <Container >


            <Navbar bg="default" expand="lg">

              <Navbar.Brand href="#home"><img src="/logo.png" width="180px" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home" titel="Home"><i className="bi bi-house-door nav-icon"></i></Nav.Link>
                  <Nav.Link href="#link" titel="Flower"><i className="bi bi-flower2 nav-icon"></i> </Nav.Link>
                  <Nav.Link href="#link" titel="Ans"> <i className="bi bi-pencil-square nav-icon"></i> </Nav.Link>

                </Nav>

                <Nav>
                  <Nav.Link href="#deets"><i className="bi bi-globe2 nav-icon"></i></Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    <i className="bi bi-bell nav-icon"></i>
                  </Nav.Link>
                  <Nav.Link href="#writeQues">
                    <Dropdown>
                      <Dropdown.Toggle variant="default" id="dropdown-basic" className="p-0">
                        <img src="/img/default.jpg" style={{height:'35px'}}/>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Hi {this.state.user.name}</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Profile</Dropdown.Item>
                        <Dropdown.Item href="javascript:void(0)" onClick={()=>this.handleLogout()}> Logout </Dropdown.Item>
                       
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>

                  <Nav.Link href="#writeQues">
                    <Button className="btn btn-info btn-round">Add Question</Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Navbar>

          </Container>
        </header>
       </>)
   }
}