// import React, { useEffect, useState } from "react";
// import { deletePostById, loadAllPosts } from "../Services/post-service";
// import {
//   Col,
//   Container,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Row,
// } from "reactstrap";
// import { Post } from "./Post";
// import { toast } from "react-toastify";
// import InfiniteScroll from "react-infinite-scroll-component";

// function NewFeed() {
//   const [postContent, setPostContent] = useState({
//     content: [],
//     totalPages: "",
//     totalElements: "",
//     pageSize: "",
//     lastPage: false,
//     pageNumber: "",
//   });
//   console.log(postContent);
//   const [currentPage, setCurrentPage] = useState(0);
//   useEffect(() => {
//     //load all posts
//     changePage(currentPage);
//   }, [currentPage]);
//   function deletePost(post) {
//     // going to delete post
//     deletePostById(post.id)
//       .then((res) => {
//         console.log(res);
//         toast.success("Post is Deleted");
//         //loadPostData();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("error in deleting post");
//       });
//   }
//   const changePage = (pageNumber = 0, pageSize = 5) => {
//     loadAllPosts(pageNumber, pageSize)
//       .then((data) => {
//         console.log(data);
//         setPostContent({
//           content: [...postContent.content, ...data.content],
//           totalPages: data.totalPages,
//           totalElements: data.totalElements,
//           pageSize: data.pageSize,
//           lastPage: data.lastPage,
//           pageNumber: data.pageNumber,
//         });

//         // window.scroll(0,0);
//       })
//       .catch((error) => {
//         toast.error("Error in loading Post");
//       });
//   };
//   const changePageInfinite = () => {
//     console.log("Page changed");
//     setCurrentPage(currentPage + 1);
//   };
//   return (
//     <div className="container-fluid">
//       <Row>
//         <Col
//           md={{
//             size: 12,
//           }}
//         >
//           <h1>Blogs Count ({postContent?.totalElements})</h1>

//           <InfiniteScroll
//             dataLength={postContent.content.length}
//             next={changePageInfinite}
//             hasMore={!postContent.lastPage}
//             loader={<h4>Loading...</h4>}
//             endMessage={
//               <p style={{ textAlign: "center" }}>
//                 <b>Yay! You have seen it all</b>
//               </p>
//             }
//           >
//             {postContent?.content.map((post) => (
//               <Post deletePost={deletePost} post={post} key={post.id} />
//             ))}
//           </InfiniteScroll>

//           {/* <Container className="mt-3">
//             <Pagination>
//               <PaginationItem disabled={postContent.pageNumber===0} >
//                 <PaginationLink previous onClick={() => changePage(postContent.pageNumber - 1)} >Previous</PaginationLink>
                
//               </PaginationItem>
//               {[...Array(postContent.totalPages)].map((item, index) => (
//                 <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
//                   <PaginationLink>{index + 1}</PaginationLink>
//                 </PaginationItem>
//               ))}

//               <PaginationItem disabled={postContent.lastPage}>
//                 <PaginationLink next onClick={() => changePage(postContent.pageNumber + 1)}>Next</PaginationLink>
                
//               </PaginationItem>
//             </Pagination>
//           </Container> */}
//         </Col>
//       </Row>
//     </div>
//   );
// }
// export default NewFeed;
import React, { useEffect, useState } from "react";
import { deletePostById, loadAllPosts } from "../Services/post-service";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import { Post } from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // load all posts
    changePage(currentPage);
  }, [currentPage]);

  function deletePost(post) {
    // going to delete post
    deletePostById(post.id)
      .then(() => {
        toast.success("Post is Deleted");

        // Update the state to remove the deleted post
        setPostContent((prevPostContent) => ({
          ...prevPostContent,
          content: prevPostContent.content.filter((p) => p.id !== post.id),
        }));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in deleting post");
      });
  }

  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading Post");
      });
  };

  const changePageInfinite = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blogs Count ({postContent?.totalElements})</h1>

          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent?.content.map((post) => (
              <Post deletePost={deletePost} post={post} key={post.id} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
