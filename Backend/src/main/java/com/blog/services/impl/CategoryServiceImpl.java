package com.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.entities.Category;
import com.blog.exceptions.ResourceNotFoundException;
import com.blog.payloads.CategoryDto;
import com.blog.repositories.CategoryRepo;
import com.blog.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CategoryDto cretaeCategory(CategoryDto categoryDto) {
		Category mapCat = this.modelMapper.map(categoryDto, Category.class);
		Category savedCat = this.categoryRepo.save(mapCat);
		return this.modelMapper.map(savedCat, CategoryDto.class);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
		category.setCategoryTitle(categoryDto.getTitle());
		category.setCategoryDescription(categoryDto.getDescription());
		
		Category updatedCat = this.categoryRepo.save(category);

		return this.modelMapper.map(updatedCat, CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
		this.categoryRepo.delete(cat);
	}

	@Override
	public CategoryDto getSingleCategory(Integer categoryId) {
		Category cat=this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
		return this.modelMapper.map(cat,CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> categorys=this.categoryRepo.findAll();
		List<CategoryDto> listDtos= categorys.stream().map(category-> this.modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
		return listDtos;
	}

}
