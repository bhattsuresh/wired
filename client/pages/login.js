import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Input, Form } from 'reactstrap';
import { applyMiddleware } from "@reduxjs/toolkit";

export default function Index() {
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIsLogin = () => setIsLogin(!isLogin);

    useEffect(() => {
        
            handleShow()

    }, [])

    let handleSignup = async (e) => {
        e.preventDefault();
        var data = { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value };
        var res = await app.post('/user/signup', data);
        if(res.status){
            var {token} = res.data;
            localStorage.setItem('_token_wired', token);
            localStorage.setItem('_data_wired', JSON.stringify(data));
            location.href ='/'
            handleClose();
        }else{
            
            app.toast(res.message)
        }
            
    
       
    }
    let handleLogin = async (e) => {
        e.preventDefault();
        var data = {name: e.target.name.value, email: e.target.email.value, password: e.target.password.value };
        var res = await app.post('/user/login', data);
        if(res.status){
            var {token} = res.data;

            alert(token)
            localStorage.setItem('_token_wired', token);
            localStorage.setItem('_data_wired', JSON.stringify(data));
            location.href = '/';
            
           handleClose();
        }

   
            app.toast(res.message)
            
    
    }


    return (<>


        <Modal show={show} >
            {isLogin ?
            <>
            <Form method="post" onSubmit={handleLogin}>
                <Modal.Header >
                    <Modal.Title> Login </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                

                    <label>Email</label>
                    <Input className="form-control" type="email" name="email" placeholder="Email" />
                    <br />
                    <label>Password</label>
                    <Input className="form-control" type="password" name="password" placeholder="Password" />

                </Modal.Body>
               
                <center>
                    <Button type="submit" variant="primary" >
                        Login
                    </Button>
                    <br/>
                    <br/>
                    </center>
                
            </Form>

           <center> <a href="javascript:void(0)"  onClick={handleIsLogin}>Signup with email</a></center>
            </>


: 
<>
            <Form method="post" onSubmit={handleSignup}>
                <Modal.Header >
                    <Modal.Title> Signup </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <label>Name</label>
                    <Input className="form-control" type="text" name="name" placeholder="Name" />
                    <br />

                    <label>Email</label>
                    <Input className="form-control" type="email" name="email" placeholder="Email" />
                    <br />
                    <label>Password</label>
                    <Input className="form-control" type="password" name="password" placeholder="Password" />

                </Modal.Body>
                <center>
                    <Button type="submit" variant="primary" >
                        Signup Now
                    </Button>
                    <br/>
                    <br/>
                    </center>
                
            </Form>

           <center> <a href="javascript:void(0)"  onClick={handleIsLogin}>Back to login</a></center>
            </>
}
        </Modal>
    </>
    )

}