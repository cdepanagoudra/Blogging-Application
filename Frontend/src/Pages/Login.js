import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../Services/user-service";
import { doLogin } from "../auth";
import { Navigate, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
const Login = () => {
  const userContextData=useContext(userContext);

  const navigate = useNavigate()

  const [loginDetail,setLoginDetail] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event , field) =>{
    let actualValue = event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }
  const handleRest=()=>{
    setLoginDetail({
      username:"",
      password:""
    })
  }
  const handleFormSubmit = (event)=>{
    event.preventDefault();
    //console.log(loginDetail);
    if(loginDetail.username.trim() == "" || loginDetail.password.trim()==""){
      toast.error("Username or Password is required !!");
      return ;
    }
    //submit the data to server to genrate the token
    loginUser(loginDetail).then((jwtTokenData)=>{
      //console.log("user login: ")
      //console.log(jwtTokenData)
      //save the data to localstorage
      doLogin(jwtTokenData,()=>{
        //console.log("login detail is save to local Storage ")
        //redirect to user dashboard page
        userContextData.setUser({
          data:jwtTokenData,
          login:true
        });
        
        navigate("/user/dashboard")
      })
      
      toast.success("Login Success")
    } ).catch(error=>{
      if(error.response.status==400 || error.response.status==404){
        toast.error(error.response.data.message)
      }else{
        toast.error("Somthing went wrong on server !!")
      }
      //console.log(error)
      
    })
  }
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Here !!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <label for="email">Enter Email</label>
                    <Input type="text" 
                    id="email" 
                    value={loginDetail.username}
                    onChange={(e)=> handleChange(e,'username')}
                    >
                      {" "}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <label for="password">Enter password</label>
                    <Input type="password" 
                    id="password"
                    value={loginDetail.password}
                    onChange={(e)=> handleChange(e,'password')}
                    >
                      {" "}
                    </Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" type="submit"outline>
                      Login
                    </Button>
                    <Button color="light" outline className="ms-2" onClick={handleRest}>
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

export default Login;
