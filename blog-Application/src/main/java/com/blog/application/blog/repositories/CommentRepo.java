package com.blog.application.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.application.blog.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
