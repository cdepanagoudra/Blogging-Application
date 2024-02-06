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
import com.blog.payloads.CategoryDto;
import com.blog.services.CategoryService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	//create
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategoryDto(@Valid @RequestBody CategoryDto categoryDto){
		CategoryDto newCategoryDto = this.categoryService.cretaeCategory(categoryDto);
		return new ResponseEntity<CategoryDto>(newCategoryDto,HttpStatus.CREATED);
	}
	//update
	@PutMapping("/{categoryId}")
	public ResponseEntity<CategoryDto> updateCategoryDto(@Valid @RequestBody CategoryDto categoryDto,@PathVariable Integer categoryId){
		CategoryDto updatedCategoryDto=this.categoryService.updateCategory(categoryDto, categoryId);
		return new ResponseEntity<>(updatedCategoryDto,HttpStatus.OK);
	}
	//Delete
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<ApiResponse> deleteCategoryDto(@RequestBody @PathVariable Integer categoryId){
		this.categoryService.deleteCategory(categoryId);
		ApiResponse apiResponse = new ApiResponse("Deleted Category with id "+categoryId,true);
		
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
	}
	//get
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryDto> getCategoryDto(@RequestBody @PathVariable Integer categoryId){
		CategoryDto singleCategory = this.categoryService.getSingleCategory(categoryId);
		return new ResponseEntity<CategoryDto>(singleCategory,HttpStatus.OK);
				
	}
	//getAll
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getAllCategoryDto(){
		List<CategoryDto> list=this.categoryService.getAllCategory();
		return new ResponseEntity<List<CategoryDto>>(list,HttpStatus.OK);
	}
}
