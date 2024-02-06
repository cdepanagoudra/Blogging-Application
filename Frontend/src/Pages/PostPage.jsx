import BaseComponent from "bootstrap/js/dist/base-component";
import Base from "../components/Base";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost } from "../Services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../Services/helper";
import YourComponent from "../components/html-text";
import { createComment } from "../Services/comment-service";
import { isLoggedIn } from "../auth";

const PostPage = () => {
    const[comment,setComment]=useState({
            content:''
    })
  const { id } = useParams();
  const [post,setPost] = useState(null)
  useEffect(()=>{
    
    //load post of postId
    loadPost(id).then(data=>{
        //console.log(data);
        setPost(data);
    }).catch((error)=>{
        //console.log(error)
        toast.error("Error is loading Post")
    })
  },[])
  const printDate =(numbers)=>{
    return new Date(numbers).toLocaleDateString()
  }
  const submitComment=()=>{
    if(!isLoggedIn()){
        toast.error("Need to login first!!")
        return;
    }
    if(comment.content.trim()===''){
        toast.error("Comment cannot be empty")
        return;
    }
    createComment(comment,post.id).then(data=>{
        //console.log(data)
        toast.success("comment added")
        setPost({
            ...post,
            comments:[...post.comments,data]
        })
        setComment({
            content:''
        })
    }).catch(error=>{
        //console.log(error)
    })
  }
  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>) }
        <Row>
            <Col md={{
                size:12
            }}>
                <Card className="mt-3 " >

                    {
                        (post) && (
                            <CardBody>
                            <CardText>
                                Posted By {" "}
                                <b>{post?.user?.name}</b> on <b>{printDate(post?.addedDate)}</b>
                                <CardText className="mt-3">
                                    <span className="text-muted ">Tags: {post.category.title}</span>
                                </CardText>
                                <div className="divider" style={{
                                    width:'100%',
                                    height:'1px',
                                    background:'#e2e2e2'
                                }}></div>
                                <CardText className="mt-3">
                                    <h1>
                                        {post.title}
                                    </h1>
                                    <div className="image-container mt-4 shadow " style={{maxWidth:'50%'}}>
                                        {post.imageName && (
                                            <img className="img-fluid" src={BASE_URL + '/post/image/' + post.imageName} alt="" />
                                        )}
                                        {/* <img className="img-fluid" src={BASE_URL+'/post/image/'+post.imageName} alt="" /> */}
                                    </div>
                                    <CardText className="mt-3">
                                        <YourComponent htmlContent={post.content} />
                                    </CardText>
                                </CardText>
                            </CardText>
                        </CardBody>
                        )
                    }
                    
                </Card>
            </Col>
        </Row>
        <Row className="my-3">
            <Col md={{
                size:9,
                offset:1
            }}>
            <h3>Comments ({post ? post.comments.length : 0})</h3>
            {
                post && post.comments.map((c,index)=>(
                    <Card key={index} className="mt-2">
                        <CardBody>
                            <CardText>
                                {c?.content}
                            </CardText>
                        </CardBody>
                    </Card>
                ))
            }
                    <Card  className="mt-2 border-0">
                        <CardBody>
                            <Input type="textarea" 
                            placeholder="Enter Your comment.." 
                            value={comment.content}
                            onChange={(event)=>setComment({content:event.target.value})}/>
                            <Button onClick={submitComment} className="my-1"color="primary">
                                Submit
                            </Button>
                        </CardBody>
                    </Card>
            </Col>
        </Row>
      </Container>
    </Base>
  );
};
export default PostPage;
