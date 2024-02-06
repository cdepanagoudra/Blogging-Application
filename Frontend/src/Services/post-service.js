import axios from "axios"
import { myAxios, privateAxios } from "./helper"
//create post function
export const createPost = (postData)=>{
    
    //console.log(postData.content+" This content iin Post DATA")
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=> response.data)
}

//get All Post
export const loadAllPosts=(pageNumber,pageSize)=>{
    return myAxios.get(`/post?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postId&sortDir=desc`).then(response=>response.data)
}

//load single post of given id

export const loadPost = (postId)=>{
    return myAxios.get("/post/"+postId).then((response)=>response.data);
}

//upload post banner image
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData()
    formData.append("image",image);
    return privateAxios.post(`/post/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>response.data)
}

//get category wise posts
export const loadPostCategoryWise=(categoryId)=>{
    return privateAxios.get(`/category/${categoryId}/posts`).then(response=>response.data);
}
//load posts user wise

export function loadPostUserWise (userId) {
    return privateAxios.get(`/user/${userId}/posts`).then(response=>response.data)
}
// delete post by id

export function deletePostById(postId){
    return privateAxios.delete(`/post/${postId}`).then(response=>response.data)
}

//update post
export function updatePost(post,postId){
    console.log(post.category.categoryId)
    return privateAxios.put(`/post/${postId}`,post).then((resp)=>resp.data);
}