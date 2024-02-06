package com.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.payloads.ApiResponse;
import com.blog.payloads.CommentDto;
import com.blog.services.CommentService;

@RestController
@RequestMapping("/api/v1/")
public class CommentController {
	@Autowired
	private CommentService commentService;
	@PostMapping("/post/{postId}/comment")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable Integer postId){
		CommentDto commentCreated = this.commentService.createComment(commentDto, postId);
		return new ResponseEntity<CommentDto>(commentCreated,HttpStatus.CREATED);
	}
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment(@RequestBody @PathVariable Integer commentId){
		this.commentService.deleteComment(commentId);
		ApiResponse apiResponse = new ApiResponse("Successfully Deleted",true);
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
	}
}
