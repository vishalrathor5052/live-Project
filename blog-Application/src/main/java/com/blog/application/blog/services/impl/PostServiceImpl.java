package com.blog.application.blog.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blog.application.blog.entities.Category;
import com.blog.application.blog.entities.Post;
import com.blog.application.blog.exceptions.ResourceNotFoundException;
import com.blog.application.blog.payloads.PostDto;
import com.blog.application.blog.payloads.PostResponse;
import com.blog.application.blog.repositories.PostRepo;
import com.blog.application.blog.services.PostService;
import com.blog.application.blog.repositories.CategoryRepo;
import com.blog.application.blog.repositories.UsersRepo;
import com.blog.application.blog.entities.User;

@Service
public class PostServiceImpl implements PostService {

        @Autowired
        private PostRepo postRepo;
        @Autowired
        private ModelMapper modelMapper;
        @Autowired
        private CategoryRepo categoryRepo;
        @Autowired
        private UsersRepo userRepo;

        @Override
        public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {

                User user = this.userRepo.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("users", "UserId", userId));
                Category category = this.categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new ResourceNotFoundException("category", "categoryId", categoryId));
                Post post = this.modelMapper.map(postDto, Post.class);
                post.setImageName("defult.png");
                post.setAddedDate(new Date());
                post.setCategory(category);
                post.setUser(user);

                Post newPost = this.postRepo.save(post);
                return this.modelMapper.map(newPost, PostDto.class);
        }

        @Override
        public PostDto updatePost(PostDto postDto, Integer postId) {

                Post post = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("post", "post id", postId));
                post.setTitle(postDto.getTitle());
                post.setContent(postDto.getContent());
                post.setImageName(postDto.getImageName());

                Post updetPost = this.postRepo.save(post);
                return this.modelMapper.map(updetPost, PostDto.class);
        }

        @Override
        public void deletePost(Integer postId) {
                Post posts = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("Post", "post id", postId));
                this.postRepo.delete(posts);
        }

        @Override
        public PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
                Sort sort = null;
                if (sortDir.equalsIgnoreCase("asc")) {
                        sort = Sort.by(sortBy).ascending();
                } else {
                        sort = Sort.by(sortBy).descending();
                }
                Pageable p = PageRequest.of(pageNumber, pageSize, sort);
                Page<Post> pagePost = this.postRepo.findAll(p);

                List<Post> allposts = pagePost.getContent();
                List<PostDto> postDtos = allposts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());

                PostResponse postResponse = new PostResponse();
                postResponse.setContent(postDtos);
                postResponse.setPageNumber(pagePost.getNumber());
                postResponse.setPageSize(pagePost.getSize());
                postResponse.setTotalElements(pagePost.getTotalElements());
                postResponse.setTotalpages(pagePost.getTotalPages());
                postResponse.setLastPage(pagePost.isLast());
                return postResponse;
        }

        @Override
        public PostDto getPostById(Integer postId) {
                Post posts = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("post", "post id", postId));

                return this.modelMapper.map(posts, PostDto.class);
        }

        @Override
        public List<PostDto> getPostByCategory(Integer categoryId) {

                Category cat = this.categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new ResourceNotFoundException("Category", "category Id",
                                                categoryId));
                List<Post> posts = this.postRepo.findByCategory(cat);
                List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());
                return postDtos;
        }

        @Override
        public List<PostDto> getPostByUser(Integer userId) {

                User user = this.userRepo.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
                List<Post> posts = this.postRepo.findByUser(user);

                List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());
                return postDtos;
        }

        @Override
        public List<PostDto> searchPost(String keyWord) {

                List<Post> posts = this.postRepo.searchByTitle("%" + keyWord + "%");

                List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());
                return postDtos;
        }

}
