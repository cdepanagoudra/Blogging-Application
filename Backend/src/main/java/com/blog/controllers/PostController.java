package com.blog.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.config.AppConstants;
import com.blog.payloads.ApiResponse;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;
import com.blog.services.CategoryService;
import com.blog.services.FileService;
import com.blog.services.PostService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/")
public class PostController {
	@Autowired
	private PostService postService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private FileService fileService;
	@Value("${project.image}")
	private String path;
	
	@PostMapping("/user/{userId}/category/{categoryId}/posts")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,
			@PathVariable Integer userId,
			@PathVariable Integer categoryId) {
		PostDto post = this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<PostDto>(post, HttpStatus.CREATED);
	}
	@GetMapping("/category/{categoryId}/posts")
	public ResponseEntity<List<PostDto>> getPostByCat(@RequestBody @PathVariable Integer categoryId){
		List<PostDto> PostDtos=this.postService.findPostByCategory(categoryId);
		return new ResponseEntity<List<PostDto>>(PostDtos,HttpStatus.OK);
	}
	@GetMapping("/user/{userId}/posts")
	public ResponseEntity<List<PostDto>> getPostByUser(@RequestBody @PathVariable Integer userId){
		List<PostDto> PostDtos=this.postService.findPostByUser(userId);
		return new ResponseEntity<List<PostDto>>(PostDtos,HttpStatus.OK);
	}
	@GetMapping("/post/{postId}")
	public ResponseEntity<PostDto> getSinglePost(@RequestBody @PathVariable Integer postId){
		PostDto post=this.postService.getPostById(postId);
		return new ResponseEntity<PostDto>(post,HttpStatus.OK);
	}
	@PutMapping("/post/{postId}")
	public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto,@PathVariable Integer postId){
		PostDto updatedPostDto=this.postService.updatePost(postDto, postId);
		//ApiResponse apiResponse= new ApiResponse("Updated Post", true);
		return new ResponseEntity<PostDto>(updatedPostDto,HttpStatus.OK);
	}
	@DeleteMapping("post/{postId}")
	public ResponseEntity<ApiResponse> deletePostById(@RequestBody @PathVariable Integer postId){
		this.postService.deletePost(postId);
		ApiResponse apiResponse = new ApiResponse("Deleted Post with id :"+postId,true);
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
	}
	@GetMapping("/post")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value = "pageNumber",defaultValue = AppConstants.defaultPageNumber,required = false)Integer pageNumber,
			@RequestParam(value = "pageSize",defaultValue = AppConstants.defaultPageSize,required = false)Integer pageSize,
			@RequestParam(value = "sortBy",defaultValue = AppConstants.defaultSortBy,required = false)String sortBy,
			@RequestParam(value = "sortDir",defaultValue = AppConstants.defaultsortDir,required = false)String sortDir

			){
		PostResponse postResponse=this.postService.getAllPost(pageNumber,pageSize,sortBy,sortDir);
		return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
	}
	@GetMapping("/post/search/{postTitle}")
	public ResponseEntity<List<PostDto>> searchPostByTitle(@RequestBody @PathVariable String postTitle){
		List<PostDto> posts=this.postService.searchPosts(postTitle);
		return new ResponseEntity<List<PostDto>>(posts,HttpStatus.OK);
	}
	@PostMapping("/post/image/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostImage(@RequestParam("image") MultipartFile image,
			@PathVariable Integer postId
			) throws IOException{
		PostDto postDto = this.postService.getPostById(postId);
		String fileName = this.fileService.uploadImage(path, image);
		
		postDto.setImageName(fileName);
		PostDto updatePost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatePost,HttpStatus.OK);
	}
	//method to server files
	@GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable("imageName") String imageName,
			HttpServletResponse response
			) throws IOException {
		InputStream resource = this.fileService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}
	
}
