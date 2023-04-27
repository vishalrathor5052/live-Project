package com.blog.application.blog.services;

import java.util.List;

import com.blog.application.blog.payloads.UsersDto;

public interface UsersServices {

    UsersDto createUsers(UsersDto users);

    UsersDto updateUsers(UsersDto users, Integer usersId);

    UsersDto getUsersById(Integer usersId);

    List<UsersDto> getAllUsers();

    void deleteUsers(Integer usersId);
}
