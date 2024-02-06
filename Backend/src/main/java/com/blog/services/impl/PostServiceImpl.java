package com.blog.services.impl;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blog.entities.Category;
import com.blog.entities.Post;
import com.blog.entities.User;
import com.blog.exceptions.ResourceNotFoundException;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;
import com.blog.repositories.CategoryRepo;
import com.blog.repositories.PostRepo;
import com.blog.repositories.UserRepo;
import com.blog.services.PostService;

@Service
public class PostServiceImpl implements PostService {
	@Autowired
	private PostRepo postRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CategoryRepo cateRepo;

	@Override
	public PostDto createPost(PostDto postDto, Integer userId, Integer categroyId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
		Category category = this.cateRepo.findById(categroyId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", categroyId));
		Post post = this.modelMapper.map(postDto, Post.class);
		post.setImageName(postDto.getImageName());
		post.setAddedDate(new Date(Calendar.getInstance().getTimeInMillis()));
		post.setCategory(category);
		post.setUser(user);
		Post savedPost = this.postRepo.save(post);
		return this.modelMapper.map(savedPost, PostDto.class);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
		Category category = this.cateRepo.findById(postDto.getCategory().getId()).get();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		post.setCategory(category);
		Post savedPost = this.postRepo.save(post);
		return this.modelMapper.map(savedPost, PostDto.class);
	}

	@Override
	public void deletePost(Integer postId) {
		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
		this.postRepo.delete(post);
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber, Integer pageSize,String sortBy,String sortDir) {
		Sort sort =sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
		
		
		Pageable p = PageRequest.of(pageNumber, pageSize,sort);
		//System.out.println(p+"=======================");
		Page<Post> pagePost = this.postRepo.findAll(p);
		//System.out.println(pagePost.getContent()+"PagePost printed");
//		
//		
//		List<Post> allPosts = pagePost.getContent();
		
		
		List<Post> allPosts = pagePost.getContent();
//		System.out.println(allPosts);
//		for(Post i : allPosts) {
//			System.out.println(i.getContent());
//		}
		List<PostDto> postDtos = allPosts.stream().map(post -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		//System.out.println(postDtos+"--------------------------");
		PostResponse postResponse = new PostResponse();
		
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setLastPage(pagePost.isLast());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		
		
		return postResponse;
	}

	@Override
	public PostDto getPostById(Integer postId) {
		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public List<PostDto> findPostByCategory(Integer categoryId) {
		Category cat = this.cateRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
		List<Post> listPosts = this.postRepo.findByCategory(cat);
		List<PostDto> lostPostDto = listPosts.stream().map(listPost -> this.modelMapper.map(listPost, PostDto.class))
				.collect(Collectors.toList());
		return lostPostDto;
	}

	@Override
	public List<PostDto> findPostByUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
		List<Post> listPosts = this.postRepo.findByUser(user);
		List<PostDto> listPostDto = listPosts.stream().map(post -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		return listPostDto;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> posts = this.postRepo.findByTitleContaining(keyword);
		List<PostDto> postDtos = posts.stream().map(post-> this.modelMapper.map(post,PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

}
