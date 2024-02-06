package com.blog.services;

import java.util.List;

import com.blog.payloads.CategoryDto;

public interface CategoryService {
	//create
	public CategoryDto cretaeCategory(CategoryDto categoryDto);
	//update
	public CategoryDto updateCategory(CategoryDto categoryDto,Integer categoryId);
	//delete
	public void deleteCategory(Integer categoryId);
	//getSingle
	public CategoryDto getSingleCategory(Integer categoryId);
	//getAll
	public List<CategoryDto> getAllCategory();
}
