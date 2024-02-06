import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import CategorySideMeny from '../components/CategorySideMeny';
import { Col, Container, Row } from 'reactstrap';
import { loadPostCategoryWise } from '../Services/post-service';
import { toast } from 'react-toastify';
import { Post } from '../components/Post';

function Categories() {
    const [post,setPost]=useState([])
    const {id} = useParams();
    useEffect(()=>{
        //console.log(id)
        loadPostCategoryWise(id).then(data=>{
            //console.log(data)
            setPost([...data])
        }).catch(error=>{
            //console.log(error)
            toast.error("Error in loading posts")
        })
    },[id])
  return (
    <Base>
        <Container className="mt-3">
        
      
        <Row>
          <Col md={2} className="pt-3">
              <CategorySideMeny/>
          </Col>
          <Col md={10}>
            <h1>Blogs Count {post.length}</h1>
                        {post.length === 0 ? (
                            <h1>No posts available in this category.</h1>
                        ) : (
                            post.map(post => (
                                <Post key={post.id} post={post} />
                            ))
                        )}
                    </Col>
        </Row>
        </Container>
    </Base>
  )
}

export default Categories