package com.blog.application.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blog.application.blog.payloads.ApiRespons;
import com.blog.application.blog.payloads.CommentDto;
import com.blog.application.blog.services.CommentService;

@RestController
@RequestMapping("/api/")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto comment,
            @PathVariable("postId") Integer postId) {

        CommentDto createCommets = this.commentService.createComment(comment, postId);

        return new ResponseEntity<CommentDto>(createCommets, HttpStatus.CREATED);

    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiRespons> deleteComment(@PathVariable("commentId") Integer commentId) {
        this.commentService.deleteComment(commentId);

        return new ResponseEntity<ApiRespons>(new ApiRespons("comment delete Successfully !!", true), HttpStatus.OK);
    }
}
