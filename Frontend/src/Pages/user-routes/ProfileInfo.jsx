import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import userContext from '../../context/userContext'
import { useParams } from "react-router-dom";
import { getUser } from "../../Services/user-service";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import ViewUserProfile from "../../components/ViewUserProfile";
function ProfileInfo() {
  const object=useContext(userContext)
  const [user,setUser] = useState(null);
  const {userId} = useParams()
  useEffect(()=>{
    getUser(userId).then(data=>{
      console.log(data)
      setUser({...data})
    })
  },[])
  const userView =()=>{
    return (
      <Row>
        <Col md={{size:6, offset:3}}>
          <Card className='mt-2 border-0 rounded-0 shadow-sm'>
            <ViewUserProfile user={user} />
          </Card>

        </Col>
      </Row>
    )
  }
  return (
    <Base>
      {user ? userView() : "Loading user data....."}
    </Base>
  );
}
export default ProfileInfo;
