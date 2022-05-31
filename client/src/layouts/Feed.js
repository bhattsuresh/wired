import React from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { render } from "react-dom";


const showDelete= id=>{

  document.querySelector(`.delete-feed-child-${id}`).classList.toggle("active")
}




export default class Index extends React.Component{
  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
    
  }

  render(){
  var {message} = this.props;
  return (
 
 <>
    <div className="feed-container mt-3">
      <div className="feed-header"><Row>
        <Col lg="1">
          <div className="feed-profile">
            <img src="/img/default.jpg" className="img-responsive" />
          </div>
        </Col>
        <Col>
        <div className="feed-user">
             Suresh
             <small>Posted by Suresh &nbsp; . 19 Mar 2022</small>
          </div>
        </Col>
      </Row> </div>


      <div className="feed-body">{message}</div>



      <div className="feed-footer">
        <Row >
          <Col>
            <Button className="icon-outer like-btn">
              <i className="bi bi-hand-thumbs-up foot-icon" ></i> &nbsp; <span className="count"> 0 </span>
            </Button>
            <Button className="icon-outer unlike-btn">
              <i className="bi bi-hand-thumbs-down foot-icon" ></i> &nbsp; <span className="count"> 0 </span>
            </Button>

            <Button className="bg-plain">
              <i className="bi bi-share-fill foot-icon" ></i>  &nbsp; <span className="count"> 0 </span>
            </Button>

            <Button className="bg-plain">
              <i className="bi bi-chat foot-icon" ></i>  &nbsp; <span className="count"> 0 </span>
            </Button>
          </Col>

          <Col lg={2} className="text-right delete-feed p-0">

            <Button className="bg-plain delete-show" style={{float:'right'}} onClick={()=>showDelete('1')}>
              <i class="bi bi-grid-3x2-gap-fill" aria-hidden="true"></i>
            </Button>

            <div className="delete-feed-child delete-feed-child-1" style={{width:'110px'}}>
              <Button className="bg-plain">
                Delete <i className="bi bi-trash" aria-hidden="true"></i>
              </Button>
            </div>
          </Col>
        </Row>


      </div>
    </div>
      
  </>
  )
  }

}