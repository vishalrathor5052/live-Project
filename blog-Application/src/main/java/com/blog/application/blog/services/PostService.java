package com.blog.application.blog.services;

import com.blog.application.blog.payloads.PostDto;
import com.blog.application.blog.payloads.PostResponse;

import java.util.List;

public interface PostService {
    // create Post
    PostDto createPost(PostDto postDto, Integer userId, Integer categoryId);

    // update post
    PostDto updatePost(PostDto postDto, Integer postId);

    // delete post
    void deletePost(Integer postId);

    // get All post

    PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    // get single post

    PostDto getPostById(Integer postId);

    // get all post by Category
    List<PostDto> getPostByCategory(Integer categoryId);

    // get all post By user

    List<PostDto> getPostByUser(Integer userId);

    // search posts
    List<PostDto> searchPost(String keyWord);
}
