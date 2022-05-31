import FullLayout from "../../src/layouts/FullLayout";
import React from "react";
import {
    Container,
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
} from 'reactstrap';


export { FullLayout };

export default class Login extends React.Component {
    handleSubmit(e){
        e.preventDefault();
        alert(e.target.email.value)
        alert(e.target.password.value)
    }
    render() {
        return (<>
            <Container className="pt-5">
                <Row>
                    <Col>
                        <Card>
                            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                                <i className="bi bi-lock me-2"> </i>
                               Login
                            </CardTitle>
                            <CardBody>
                                <Form method="post" onSubmit={this.handleSubmit}> 
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            placeholder="********"
                                            type="password"
                                        />
                                    </FormGroup>
                                    
                                    <Button>Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row></Container></>)
    }
}