package com.lingo.lingoalpha2_0.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainController {

    @GetMapping("/welcome")
    public String allAccess(){
        return "Everyone access";
    }

    @GetMapping("/user")
    public String userAccess(){
        return "User access with Jwt";
    }

    @GetMapping("/special")
    public String specialAccess(){
        return "Special access with Jwt";
    }
}
