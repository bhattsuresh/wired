import React,{useState} from "react";
import Link from "next/link";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import {Input } from 'reactstrap';

export default function Index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: e.target.message.value })
  };
  fetch('http://localhost:5000/api/user/feed', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status)
          handleClose()
      });
  };
  return (<>
    <Row className="add-question">
      <Col lg="2">
        <div className="feed-profile">
          <img src="/img/default.jpg" className="img-responsive" />
        </div>
      </Col>
      <Col>
        <div className="feed-user">
          <div class="form-control msg-box btn-round" onClick={handleShow} contentEditable="false" id="msgBox" data-placeholder="Ask a question."></div>
        </div>
      </Col>
    </Row>

    <Modal show={show} onHide={handleClose}>
        <form method="post" onSubmit={(event)=>handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Input className="form-control" name="message" placeholder='Start your question with "What", "How", "Why", etc.'  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Post Question
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
  </>
  )

}