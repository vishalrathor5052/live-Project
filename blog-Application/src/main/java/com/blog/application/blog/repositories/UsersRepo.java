package com.blog.application.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.application.blog.entities.User;

public interface UsersRepo extends JpaRepository<User, Integer> {

}
