import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../Services/user-service";
import { toast } from "react-toastify";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  // useEffect(()=>{
  //   console.log(data);

  // },[data])

  //dynamic setting the property
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  //submit the form
  const submitForm = (event) => {
    event.preventDefault();
     // if(error.isError){
    //   toast.error("Form data is invalid");

    //   return ;
    // }
    //console.log(data);
    //data validate

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        //console.log(resp);
        //console.log("success log");
        toast.success("User is registered successfully!!");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        //console.log(error);
        //console.log("Error Log");
        //handle errors on proper way
        setError({
          errors:error,
          isError:true
        })
      });
  };
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h1>Fill Information to Register !!</h1>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name?true : false}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={error.errors?.response?.data?.email?true : false}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password?true : false}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Enter about yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "250px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={error.errors?.response?.data?.about?true : false}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center pb-2">
                    <Button color="light" outline>
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="light"
                      outline
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
