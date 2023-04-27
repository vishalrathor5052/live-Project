package com.blog.application.blog.controllers;

import java.util.List;

import javax.validation.Valid;

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
import com.blog.application.blog.payloads.UsersDto;
import com.blog.application.blog.services.UsersServices;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UsersServices usersServices;

    // POST:- create user
    @PostMapping("/")
    public ResponseEntity<UsersDto> createUser(@Valid @RequestBody UsersDto usersDto) {
        UsersDto createUserDto = this.usersServices.createUsers(usersDto);
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);

    }

    // put:-update user
    @PutMapping("/{userId}")
    public ResponseEntity<UsersDto> updateUser(@Valid @RequestBody UsersDto usersDto,
            @PathVariable("userId") Integer uid) {
        UsersDto updaUsersDto = this.usersServices.updateUsers(usersDto, uid);
        return ResponseEntity.ok(updaUsersDto);
    }

    // DELETE:- delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiRespons> deleteUser(@PathVariable("userId") Integer uid) {
        this.usersServices.deleteUsers(uid);
        return new ResponseEntity<ApiRespons>(new ApiRespons("user delete Successfully", true), HttpStatus.OK);
    }

    // GET:- user get

    @GetMapping("/")
    public ResponseEntity<List<UsersDto>> getAllUsers() {
        return ResponseEntity.ok(this.usersServices.getAllUsers());
    }

    // GET BY ID:- user get by Id
    @GetMapping("/{userId}")
    public ResponseEntity<UsersDto> getUserById(@PathVariable("userId") Integer uid) {
        return ResponseEntity.ok(this.usersServices.getUsersById(uid));

    }
}
