import Head from "next/head";
import React from "react";
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Dropdown } from "react-bootstrap";

import { SiteHeader,FeedHeader, Feed } from '../src';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false, user: {},feeds:[],isLoading:true }

  }
  componentDidMount() {
    var _token = localStorage.getItem('_token_wired');
    if (_token) {
      this.setState({ isLogin: !this.state.isLogin });
      this.setState({ user: JSON.parse(localStorage.getItem('_data_wired')) });
      this.setState({ isLoading: false });
      
    }else{
      location.href = '/login';
    }


    app.get('/user/feed')
      .then(data => {
        this.setState({feeds:data.data})
      });

  }

  render() {
  
    if(this.state.isLoading)
      return <></>

    return (
      <>
        <Head>
          <title>WiredReviews</title>
          <meta
            name="description"
            content="WiredReviews"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

      
        <SiteHeader/>

        <Container className="pt-3">
          <Row>
            <Col lg="3" className="bg-white">
              <b>Categories:</b> <br/>
              Electronics <br/>
Accessories <br/>
Audio <br/>
Cameras <br/>
Computers <br/>
Gaming <br/>
Headphones <br/>
Home Theater <br/>
Laptops <br/>
Air Conditioner <br/>
Smartphones <br/>

TV's <br/>
Tablets <br/>
Printers <br/>
Others <br/>

Home & Garden <br/>
Home <br/>
Garden <br/>

 Kitchen & Dining <br/>

 Travel <br/>

Baby & Kid <br/>

 Health & Fitness 


            </Col>
            <Col lg="6" className="">
              <div className="bg-white pt-3">
                <FeedHeader />
              </div>

              <div className=" mt-3">

             {this.state.feeds && this.state.feeds.map(feed=><Feed message={feed.message} />)}
               

             
              </div>

            </Col>
            <Col lg="3" className="bg-white">
              Right
            </Col>
          </Row>


        </Container>
      </>
    );
  }
}