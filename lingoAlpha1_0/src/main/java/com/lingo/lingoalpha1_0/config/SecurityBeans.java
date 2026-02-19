package com.lingo.lingoalpha1_0.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration // this declares this class as a place where we declare beans
public class SecurityBeans {
    @Bean // allows us to make this method a managed object so we can reuse it where we neeed without instantiating it each time
    public PasswordEncoder passwordEncoder(){
        //we will be creating the password hash with the bcrypt password encoder, it doesnt actually encrypt it is a one way hash
        return new BCryptPasswordEncoder();
    }
}
