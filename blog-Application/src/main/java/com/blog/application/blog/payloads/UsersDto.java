package com.blog.application.blog.payloads;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UsersDto {

    private int id;
    @NotEmpty
    @Size(min = 4, message = "UserName must be contines 4 char !!")
    private String name;
    @Email(message = "Email adddress is not valid")
    private String email;
    @NotEmpty
    @Size(min = 4, max = 6, message = "password mast be  min of 4  char and  max of 6 char !!")
    private String Password;
    @NotEmpty
    private String about;

}
