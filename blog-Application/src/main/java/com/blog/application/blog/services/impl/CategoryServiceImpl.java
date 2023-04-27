package com.blog.application.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.application.blog.entities.Category;
import com.blog.application.blog.exceptions.ResourceNotFoundException;
import com.blog.application.blog.payloads.CategoryDto;
import com.blog.application.blog.repositories.CategoryRepo;
import com.blog.application.blog.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category cat = this.modelMapper.map(categoryDto, Category.class);
        Category addCategory = this.categoryRepo.save(cat);

        return this.modelMapper.map(addCategory, CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {

        Category cat = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        cat.setCategoryTitle(categoryDto.getCategoryTitle());
        cat.setCategorydescription(categoryDto.getCategorydescription());

        Category updateCategory = this.categoryRepo.save(cat);
        return this.modelMapper.map(updateCategory, CategoryDto.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category cat = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        this.categoryRepo.delete(cat);

    }

    @Override
    public CategoryDto getCategoryById(Integer categoryId) {
        Category cat = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        return this.modelMapper.map(cat, CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAllCategory() {
        List<Category> getCategory = this.categoryRepo.findAll();
        List<CategoryDto> CategoryDtos = getCategory.stream()
                .map((cat) -> this.modelMapper.map(cat, CategoryDto.class)).collect(Collectors.toList());

        return CategoryDtos;
    }

}
