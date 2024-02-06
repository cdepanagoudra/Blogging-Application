import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { loadPost, updatePost } from "../Services/post-service";
import { toast } from "react-toastify";
import Base from "../components/Base";
import JoditEditor from "jodit-react";
import loadAllCategories from "../Services/category-service";

function UpdateBlog() {
  const editor = useRef(null);
  //const [content, setContent] = useState("");
  const [category, setCategory] = useState([]);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const doReset = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
  };
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        //console.log(data)
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Load the blog from database
    loadPost(blogId)
      .then((data) => {
        console.log(data)
        setPost({ ...data, categoryId: data?.category?.id });
        
      })
      .catch((error) => {
        console.log(error);
        toast.error("error while loading the blog");
      });
  }, []);
  console.log(post?.user?.id+" this is post user id");
        console.log(object?.user?.data?.user?.id+" this is coming from context");
  useEffect(() => {
    
    if (post) {
        
      if (post?.user?.id != object?.user?.data?.user?.id) {
        toast.error("This is not your post");
        navigate("/");
      }
    }
  }, [post]);
  //console.log(post)
  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };
  const updatedPost = (event) => {
    event.preventDefault();
    console.log(post);
    updatePost({ ...post, category: {id : post.categoryId} }, post.id)
      .then(res=>{
        console.log(res);
        toast.success("Post Updated");
      }).catch(error=>{
        console.log(error);
        toast.error("error in updating error")
      })
      
  };
  const updateHtml = () => {
    return (
      <div className="wrapper">
        {/* {JSON.stringify(post)} */}
        <Card className="shadow-lg border-3 mt-2">
          <CardBody>
            <h3> Update Your Post From Here</h3>
            <Form onSubmit={updatedPost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="title"
                  value={post?.title}
                  onChange={(event) => handleChange(event, "title")}
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
                  value={post?.content}
                  onChange={newContent=>{
                    setPost({
                        ...post,
                        content : newContent
                    })
                  }}
                ></JoditEditor>
              </div>
              {/*file field */}
              <div className="my-3">
                <label for="image">Select Post Banner</label>
                <Input id="image" type="file" accept="image/*" />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryId"
                  onChange={(event) => handleChange(event, "categoryId")}
                  value={post?.categoryId}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>
                  {category.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center">
                <Button type="submit" color="primary">
                  Update Post
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
  return (
    <Container>
      <Base>{post && updateHtml()}</Base>
    </Container>
  );
}

export default UpdateBlog;
