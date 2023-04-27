package com.blog.application.blog.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import com.blog.application.blog.config.AppConstent;
import com.blog.application.blog.payloads.ApiRespons;
import com.blog.application.blog.payloads.PostDto;
import com.blog.application.blog.payloads.PostResponse;
import com.blog.application.blog.services.FileService;
import com.blog.application.blog.services.PostService;

@RestController
@RequestMapping("/api/")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    // create
    @PostMapping("/user/{userId}/category/{categoryId}/post")
    public ResponseEntity<PostDto> cratePost(@RequestBody PostDto postDto, @PathVariable("userId") Integer userId,
            @PathVariable("categoryId") Integer categoryId) {

        PostDto createPost = this.postService.createPost(postDto, userId, categoryId);

        return new ResponseEntity<PostDto>(createPost, HttpStatus.CREATED);
    }

    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity<List<PostDto>> getPostByCategory(@PathVariable Integer categoryId) {

        List<PostDto> posts = this.postService.getPostByCategory(categoryId);

        return new ResponseEntity<List<PostDto>>(posts, HttpStatus.OK);

    }

    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<PostDto>> getPostByUser(@PathVariable Integer userId) {
        List<PostDto> post = this.postService.getPostByUser(userId);

        return new ResponseEntity<List<PostDto>>(post, HttpStatus.OK);
    }

    @GetMapping("/post")
    public ResponseEntity<PostResponse> getAllPost(
            @RequestParam(value = "pageNumber", defaultValue = AppConstent.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstent.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstent.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstent.SORT_DIR, required = false) String sortDir) {

        PostResponse postResponse = this.postService.getAllPost(pageNumber, pageSize, sortBy, sortDir);

        return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId) {
        PostDto postById = this.postService.getPostById(postId);
        return new ResponseEntity<PostDto>(postById, HttpStatus.OK);
    }

    @DeleteMapping("/post/{postId}")
    public ApiRespons deletePost(@PathVariable Integer postId) {
        this.postService.deletePost(postId);
        return new ApiRespons("post is successfully delete !!", true);
    }

    @PutMapping("/post/{postId}")
    public ResponseEntity<PostDto> updatepost(@RequestBody PostDto postDto, @PathVariable Integer postId) {
        PostDto updatePost = this.postService.updatePost(postDto, postId);

        return new ResponseEntity<PostDto>(updatePost, HttpStatus.OK);

    }

    // search

    @GetMapping("/post/search/{keywords}")
    public ResponseEntity<List<PostDto>> searchPostByTitle(@PathVariable("keywords") String keywords) {
        List<PostDto> result = this.postService.searchPost(keywords);

        return new ResponseEntity<List<PostDto>>(result, HttpStatus.OK);
    }

    // post image upload
    @PostMapping("/post/image/upload/{postId}")
    public ResponseEntity<PostDto> uploadImage(@RequestParam("image") MultipartFile image,
            @PathVariable Integer postId) throws IOException {
        PostDto postDto = this.postService.getPostById(postId);
        String fileName = this.fileService.uploadImage(path, image);

        postDto.setImageName(fileName);
        PostDto updatepost = this.postService.updatePost(postDto, postId);

        return new ResponseEntity<PostDto>(updatepost, HttpStatus.OK);
    }

    // method to serve file
    @GetMapping(value = "post/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void dowmloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response)
            throws IOException {
        InputStream resource = this.fileService.getResource(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }

}
