package com.blog.application.blog.payloads;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class CommentDto {

    private Integer Id;
    private String content;
}
