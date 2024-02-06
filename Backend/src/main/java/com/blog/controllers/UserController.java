package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.payloads.ApiResponse;
import com.blog.payloads.UserDto;
import com.blog.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
	private UserService userService;

	// Post-Create User
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
		UserDto createUserDto = this.userService.createUser(userDto);
		return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUserDto(@Valid @RequestBody UserDto userDto, @PathVariable Integer userId) {
		UserDto updatedUserDto=this.userService.updateUser(userDto, userId);
		return ResponseEntity.ok(updatedUserDto); 
	}
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteUserDto(@PathVariable Integer id){
		this.userService.deleteUser(id);
//		return ResponseEntity.ok(Map.of("message","User Deleted Successfully"));
		return new ResponseEntity<ApiResponse>(new ApiResponse("user deleted Sussessfuly",true),HttpStatus.OK);
	}
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers(){
		return ResponseEntity.ok(this.userService.getAllUser());
	}
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getSingleUsers(@PathVariable Integer id){
		UserDto gotUserDto=this.userService.getUserById(id);
		return ResponseEntity.ok(gotUserDto);
	}
}
