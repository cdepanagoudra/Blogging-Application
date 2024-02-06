
import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import loadAllCategories from "../Services/category-service";
import JoditEditor from 'jodit-react';
import { json } from "react-router-dom";
import { createPost as doCreatePost, uploadPostImage} from "../Services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";
const AddPost = () => {
    const editor = useRef(null)
    const [user,setUser]=useState(undefined)
    const [content,setContent]=useState('')

    const [category,setCategory]=useState([])

    const [post,setPost]=useState({
        title:'',
        content:'',
        categoryId:''

    })

    const[image,setImage]=useState(null)
    const doReset=()=>{
      setPost({
        title:'',
        content:'',
        categoryId:''
      })
    }
    const fieldChaged=(event)=>{
        //console.log(event)
        setPost({...post,[event.target.name]: event.target.value})
    }
    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }
    useEffect(
        ()=>{
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                //console.log(data)
                setCategory(data)
            }).catch(error=>{
                //console.log(error)
            })
        },[]
    )
    //create post function
    
    const createPost = (event) => {
      event.preventDefault();
    
      if (post.title.trim() === '') {
        toast.error('Post title is required !!');
        return;
      }
    
      if (post.content.trim() === '') {
        toast.error('Post content is required !!');
        return;
      }
    
      if (post.categoryId === '') {
        toast.error('Select some category !!');
        return;
      }
    
      // Set user ID in post data
      post['userId'] = user.id;
    
      // Submit the form on the server
      doCreatePost(post)
        .then((createdPost) => {
          if (image) {
            // Upload the image only if there is data in the image state
            uploadPostImage(image, createdPost.id)
              .then(() => {
                toast.success('Image Uploaded !!');
              })
              .catch((error) => {
                toast.error('Error in uploading image');
                console.error(error);
              });
          }
    
          toast.success('Post Created');
          setPost({
            title: '',
            content: '',
            categoryId: '',
          });
        })
        .catch((error) => {
          toast.error('Post not created due to some error !!');
          console.error(error);
        });
    };
    

    // const createPost = (event)=>{
    //     event.preventDefault();
    //     //console.log(post)
    //     //console.log("form submitted")
    //     if(post.title.trim()===''){
    //         toast.error("Post title is required !!")
    //         return;
    //     }
    //     if(post.content.trim()===''){
    //         toast.error("Post content is required !!")
    //         return;
    //     }
    //     if(post.categoryId===''){
    //         toast.error("select some category !!")
    //         return;
    //     }
    //     //submit the form on server
    //     post['userId'] = user.id
    //     //console.log(post.userID + " This is user id of post data")
    //     doCreatePost(post).then(post=>{
            
    //         uploadPostImage(image,post.id).then(data=>{
    //           toast.success("Image Uploaded !!")
    //         }).catch(error=>{
    //           toast.error("Error in uploading image")
    //           console.log(error)
    //         })

    //         toast.success("Post Created")
    //         setPost({
    //           title:'',
    //           content:'',
    //           categoryId:''
    //         })
    //         //console.log(post)
    //     }).catch((error)=>{
    //         toast.error("Post not created due to some error !!")
    //         //console.log(error)
    //     })

    // }
    //handle file change
    const handleFileChange =(event)=>{
      console.log(event.target.files[0])
      setImage(event.target.files[0])
    }
  return (
    <div className="wrapper">
      {/* <h1>We are going to develop add post </h1> */}
      <Card className="shadow-lg border-3 mt-2">
        <CardBody>
            
          <h3> Whats on you Mind</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChaged}
              ></Input>
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{ height: "300px" }}
              ></Input> */}
              <JoditEditor 
              ref={editor}
              value={content}
              onChange={contentFieldChanged}
              >

              </JoditEditor>
            </div>
            {/*file field */}
            <div className="my-3"> 
              <label for="image">Select Post Banner</label>
              <Input id="image" type="file" onChange={handleFileChange} accept="image/*"/>
            </div>
              
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChaged}
                defaultValue={0}
              >
                <option disabled value={0}>--Select category--</option>
                {
                    category.map((category)=>(
                        <option value={category.id} key={category.id}>
                            {category.title}
                        </option>
                    ))

                    
                }
              </Input>
            </div>
            <Container className="text-center">
                <Button type="submit" color="primary">
                    Create Post
                </Button>
                <Button className="ms-2" color="danger" onClick={doReset}>
                    Reset Post
                </Button>
            </Container>
          </Form>
          
        </CardBody>
      </Card>
    </div>
  );
};
export default AddPost;
