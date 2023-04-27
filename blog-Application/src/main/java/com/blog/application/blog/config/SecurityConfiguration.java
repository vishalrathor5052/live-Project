package com.blog.application.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    void filterChain(HttpSecurity http) throws Exception {
        http.csrf(withDefaults())

                .authorizeHttpRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic(withDefaults());

    }

}