package com.lingo.lingoalpha1_0.service;

/*
This is where we are going to have the rules on authentication, like registering and logging users in
 */

import com.lingo.lingoalpha1_0.entity.User;
import com.lingo.lingoalpha1_0.repository.UserRepository; // we import the user repo
import org.springframework.security.crypto.password.PasswordEncoder; // we import the password encoder
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthService {

    //we use final here to make sure they get assigned only once in our constructer and we dont assign them to a different object
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User register(String userName, String email, String password, String firstName, String lastName, LocalDate birthday){
        //this is the method to register, if the parameters are not entered there will be an error
        //Validate **INTENDED TO USE "isEmpty()" but isBlank() invalidates entries with only whitespace so better suited for our purpose
        if(userName == null || userName.isBlank()){
            throw new IllegalArgumentException("Username cannot be empty");// throw new error which we will return a response accordingly to frontend
        }
        if(email == null || email.isBlank()){
            throw new IllegalArgumentException("Email cannot be empty");// throw new error which we will return a response accordingly to frontend
        }
        if(password == null || password.isBlank()){
            throw new IllegalArgumentException("Password cannot be empty");// throw new error which we will return a response accordingly to frontend
        }
        if(firstName == null || firstName.isBlank()){
            throw new IllegalArgumentException("First Name cannot be empty");// throw new error which we will return a response accordingly to frontend
        }
        if(lastName == null || lastName.isBlank()){
            throw new IllegalArgumentException("Last Name cannot be empty");// throw new error which we will return a response accordingly to frontend
        }
        if(birthday == null ){
            throw new IllegalArgumentException("Birthday cannot be empty");// throw a new error which we will return a response accordingly to frontend
        }
        //Using local date methods to make sure user doesnt enter birthday in the future and that they are over 18
        LocalDate today = LocalDate.now();
        if(birthday.isAfter(today)){
            throw new IllegalArgumentException("Birthday cannot be in the future");// throw new error which we will return a response accordingly to frontend
        }
        if(birthday.plusYears(18).isAfter(today)){
            throw new IllegalArgumentException("You must be older than 18 to sign up.");// throw new error which we will return a response accordingly to frontend
        }
        //so username, password, name, email, birthday etc have to be filled and then the ID will be auto generated for our database for security reasons
        //now we check the database to see if there is duplicates
        if(userRepository.existsByUserName(userName)){
            throw new IllegalArgumentException("Username already exists");
        }
        if(userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("Email already exists");
        }
        //create new user and set details
        User newUser = new User();
        newUser.setUserName(userName);
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setBirthday(birthday);

        //well use our encoder then to hash the password to save to the database with the new user
        newUser.setPasswordHash(passwordEncoder.encode(password));
        //save the user to the db
        return userRepository.save(newUser);
    }

  /*
  *Using this method initially until I became more familiar with Spring Security
   *REDUNDANT, USING SPRING SECURITY LOG IN FEATURE NOW
   public User authenticate(String userName, String rawPassword){
        //make sure the username and password fields are filled
        if(userName == null || userName.isBlank()||rawPassword == null || rawPassword.isBlank()){
            throw new IllegalArgumentException("Username and password cannot be empty");
        }
        //we will search the user by the username and findBy method from JPA
        User preAuthUser = userRepository.findByUserName(userName)
                //this is why we use the OPTIONAL wrapper incase the user is not found
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        // if found we verify the password
        boolean passwordMatches = passwordEncoder.matches(rawPassword, preAuthUser.getPasswordHash());
        if(!passwordMatches){
            throw new IllegalArgumentException("Invalid credentials");

        }
        return preAuthUser;
    }*/

    public User authenticate(String username, String password) {

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    //option to search user by long id
    public User getById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }


}
