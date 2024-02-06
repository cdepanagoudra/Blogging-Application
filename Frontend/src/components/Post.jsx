import React, { useContext, useState } from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import YourComponent from "./html-text";
import { Link } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import { useEffect } from "react";
import  userContext from "../context/userContext"
export function Post({
  post = {
    id:-1,
    title: "This is default post title",
    content: "this is default post content",
  },deletePost
}) {
  const userContextData = useContext(userContext)
  const truncatedContent = post.content.substring(0, 100);
  const [user,setUser] = useState(null)
  const [login,setLogin] = useState(null)
  useEffect(()=>{
    //console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  },[])
  
  return (
    
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText>
          <YourComponent htmlContent={truncatedContent} />
        </CardText>
        
        <div>
          <Link className="btn btn-secondary border-2" to={'/post/'+post.id}>Read More..</Link>
          
          {userContextData.user.login && ( user && user.id==post.user.id?<Button onClick={()=>deletePost(post)} color="danger" className="ms-2">Delete</Button>:'')  }
          {userContextData.user.login && ( user && user.id==post.user.id?<Button tag={Link} to={`/user/update-blog/${post.id}`} color="warning" className="ms-2">Update</Button>:'')  }
        </div>
      </CardBody>
    </Card>
  );
}
