package com.blog.application.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blog.application.blog.entities.User;
import com.blog.application.blog.exceptions.ResourceNotFoundException;
import com.blog.application.blog.payloads.UsersDto;
import com.blog.application.blog.repositories.UsersRepo;
import com.blog.application.blog.services.UsersServices;

@Service
public class UsersServiceImpl implements UsersServices {
    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UsersDto createUsers(UsersDto usersDto) {

        User user = this.dtoToUser(usersDto);
        User saveUser = this.usersRepo.save(user);

        // throw new UnsupportedOperationException("Unimplemented method
        // 'createUsers'");
        return this.userToDto(saveUser);
    }

    @Override
    public UsersDto updateUsers(UsersDto usersDto, Integer usersId) {

        User user = this.usersRepo.findById(usersId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", usersId));
        user.setName(usersDto.getName());
        user.setEmail(usersDto.getEmail());
        user.setPassword(usersDto.getPassword());
        user.setAbout(usersDto.getAbout());

        User updateUser = this.usersRepo.save(user);
        UsersDto userDto1 = this.userToDto(updateUser);
        return userDto1;
    }

    @Override
    public UsersDto getUsersById(Integer usersId) {
        User user = this.usersRepo.findById(usersId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", usersId));

        return this.userToDto(user);
    }

    @Override
    public List<UsersDto> getAllUsers() {
        List<User> user = this.usersRepo.findAll();

        List<UsersDto> userDtos = user.stream().map(users -> this.userToDto(users)).collect(Collectors.toList());

        return userDtos;
    }

    @Override
    public void deleteUsers(Integer usersId) {

        User user = this.usersRepo.findById(usersId)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", usersId));

        this.usersRepo.delete(user);

    }

    public User dtoToUser(UsersDto usersDto) {

        User user = this.modelMapper.map(usersDto, User.class);
        // User user = new User();
        // user.setId(usersDto.getId());
        // user.setName(usersDto.getName());
        // user.setEmail(usersDto.getEmail());
        // user.setPassword(usersDto.getPassword());
        // user.setAbout(usersDto.getAbout());

        return user;
    }

    public UsersDto userToDto(User user) {

        UsersDto usersDto = this.modelMapper.map(user, UsersDto.class);
        // UsersDto usersDto = new UsersDto();

        // usersDto.setId(user.getId());
        // usersDto.setName(user.getName());
        // usersDto.setEmail(user.getEmail());
        // usersDto.setPassword(user.getPassword());
        // usersDto.setAbout(user.getAbout());
        return usersDto;
    }

}
