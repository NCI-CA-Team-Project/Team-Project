/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.web_back_end.controller;

import com.example.web_back_end.service.AuthenticationService;  // import AuthenticationService
import org.springframework.web.bind.annotation.*;   // import web annotation (@RestController, @PostMapping, etc.)

/**
 *
 * @author ABC
 */

@RestController // tells Spring that this class is to receive web request
public class AuthenticationController {
    // variable
    private final AuthenticationService authenticationService;
    
    // constructor
    public AuthenticationController(AuthenticationService authenticationService)
    {
        this.authenticationService = authenticationService;
    }
    
    // compute
    @PostMapping("/login")
    public String login(@RequestParam String id,
                        @RequestParam String password)
    {
        boolean result = authenticationService.login(id, password);
        
        if(result)
        {
            return "Login Success";
        }
        else
        {
            return "Login Failed";
        }
    }
    
    
}
