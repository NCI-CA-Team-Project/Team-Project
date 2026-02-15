/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.AuthenticationService to edit this template
 */
package com.example.web_back_end.service;

import com.example.web_back_end.repository.UserRepository;  // import UserRepository
import com.example.web_back_end.entity.User;        // import User
import org.springframework.stereotype.Service;      // @service

/**
 *
 * @author ABC
 */

//
// we use plane password here now
// when we complete hashing, we need to correct this code
//
//



@Service    // it tells Spring that this class is Service and automatically generate Bean
public class AuthenticationService {
    // variable
    private final UserRepository userRepository;
    
    // constructor
    public AuthenticationService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }
    
    // compute
    public boolean login(String id, String password)
    {
        User user = userRepository.findById(id).orElse(null);   // this is select statement (SELECT * FROM Users WHERE ID = ?)
        // if a user with the given ID exists in the database, it returns the User object
        // if not, it returns null
        
        if(user == null)
        {
            return false;
        }
        
        return password.equals(user.getPasswordHash());
    }
    
    
}
