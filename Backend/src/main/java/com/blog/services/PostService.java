package com.blog.services;

import java.util.List;

import com.blog.entities.Post;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;

public interface PostService {
	//create
	PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);
	//update
	PostDto updatePost(PostDto postDto,Integer postId);
	//delete
	void deletePost(Integer postId);
	//get all
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);
	//get single post
	PostDto getPostById(Integer postId);
	//get All post by category
	List<PostDto> findPostByCategory(Integer categoryId);
	//get All post by User
	List<PostDto> findPostByUser(Integer userId);
	//search post by keyword
	List<PostDto> searchPosts(String keyword);

	
	
	
}

