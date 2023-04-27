package com.blog.application.blog.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.application.blog.entities.Comment;
import com.blog.application.blog.entities.Post;
import com.blog.application.blog.exceptions.ResourceNotFoundException;
import com.blog.application.blog.payloads.CommentDto;
import com.blog.application.blog.repositories.CommentRepo;
import com.blog.application.blog.repositories.PostRepo;
import com.blog.application.blog.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private PostRepo postRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CommentDto createComment(CommentDto commentDto, Integer postId) {

        Post post = this.postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

        Comment comment = this.modelMapper.map(commentDto, Comment.class);

        comment.setPost(post);

        Comment savedComment = this.commentRepo.save(comment);

        return this.modelMapper.map(savedComment, CommentDto.class);

    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = this.commentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("comment", "commentId", commentId));

        this.commentRepo.delete(comment);
    }

}
