import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <CardBody>
      <h3 className="text-uppercase">User Information</h3>
      <Container className="text-center">
        <img
          style={{ maxWidth: "150px", maxHeight: "150px" }}
          src={
            user.image
              ? user.image
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="User profile picture"
          className="img-fluid"
        ></img>
      </Container>
      <Table
        responsive
        striped
        hover
        bordered={true}
        className="text-center mt-5"
      >
        <tbody>
          <tr>
            <td>USER NAME</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>USER EMAIL</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>ABOUT</td>
            <td>{user.about}</td>
          </tr>
          <tr>
            <td>ROLE</td>
            <td>
              {user.roles.map((role) => {
                return <div key={role.id}>{role.name}</div>;
              })}
            </td>
          </tr>
        </tbody>
      </Table>
      {currentUser ? (currentUser.id == user.id) ? (<CardFooter className="text-center">
          <Button color="warning">Update Profile</Button>
        </CardFooter>) : '' : ''}
    </CardBody>
  );
};

export default ViewUserProfile;
