package com.blog.application.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.application.blog.payloads.ApiRespons;
import com.blog.application.blog.payloads.CategoryDto;
import com.blog.application.blog.services.CategoryService;
import java.util.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Create Category
    @PostMapping("/")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {

        CategoryDto catDto = this.categoryService.createCategory(categoryDto);
        return new ResponseEntity<CategoryDto>(catDto, HttpStatus.CREATED);
    }

    // updateCategory
    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> updateCatergory(@Valid @RequestBody CategoryDto categoryDto,
            @PathVariable("categoryId") Integer categoryId) {
        CategoryDto categoryDto2 = this.categoryService.updateCategory(categoryDto, categoryId);
        return new ResponseEntity<CategoryDto>(categoryDto2, HttpStatus.OK);
    }

    // delete Category
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<ApiRespons> deleteCategory(@PathVariable("categoryId") Integer categoryId) {

        this.categoryService.deleteCategory(categoryId);

        return new ResponseEntity<ApiRespons>(new ApiRespons("category deleted succesfully !!", true), HttpStatus.OK);
    }

    // get Category
    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("categoryId") Integer categoryId) {

        CategoryDto getCategory = this.categoryService.getCategoryById(categoryId);
        return new ResponseEntity<CategoryDto>(getCategory, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getCategory() {

        List<CategoryDto> catList = this.categoryService.getAllCategory();
        return ResponseEntity.ok(catList);

    }

}
