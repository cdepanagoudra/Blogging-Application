import BaseComponent from "bootstrap/js/dist/base-component";
import { React, useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import { deletePostById, loadPostUserWise } from "../../Services/post-service";
import { toast } from "react-toastify";
import {Post} from "../../components/Post"
const Userdashboard = () => {
  const [user,setUser] = useState({})
  const [post,setPost] = useState([])
  useEffect(()=>{
    //console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData()
  },[])
  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then(data=>{
      //console.log(data)
      setPost([...data])
    }).catch(error=>{
      //console.log(error);
      toast.error("Error while loading Posts")
    })
  }
  function deletePost (post){
    // going to delete post
    deletePostById(post.id).then(res=>{
      //console.log(res);
      toast.success("Post is Deleted");
      loadPostData()
    }).catch(error=>{
      //console.log(error);
      toast.error("error in deleting post")
    })
  }
  return (
    <Base>
      <Container>
        <AddPost />
        <h1>My Blogs : ({post.length})</h1>
        {post.map((post,index)=>{
          return (
            <Post post={post} key={index} deletePost={deletePost}/> 
          )
        })}
      </Container>
    </Base>
  );
};

export default Userdashboard;
