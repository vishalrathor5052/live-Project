package com.blog.application.blog.services;

import java.util.List;
import com.blog.application.blog.payloads.CategoryDto;

public interface CategoryService {

    // create Category
    CategoryDto createCategory(CategoryDto categoryDto);

    // UpdateCagtegory
    CategoryDto updateCategory(CategoryDto categoryDto, Integer CategoryId);

    // delete Cagegory

    void deleteCategory(Integer CategoryId);
    // get one Cagegory

    CategoryDto getCategoryById(Integer CategoryId);

    // get all catwwgory
    List<CategoryDto> getAllCategory();

}
