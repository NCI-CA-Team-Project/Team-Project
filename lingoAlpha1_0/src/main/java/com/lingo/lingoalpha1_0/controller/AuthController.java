package com.lingo.lingoalpha1_0.controller;

import com.lingo.lingoalpha1_0.entity.User;
import com.lingo.lingoalpha1_0.dto.LoginRequestDTO;
import com.lingo.lingoalpha1_0.dto.RegisterRequestDTO;
import com.lingo.lingoalpha1_0.dto.UserResponseDTO;
import com.lingo.lingoalpha1_0.service.AuthService;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/auth") // this is to prefix these to each of our paths
public class AuthController {
    //declaring auth service, private so it can only be referenced once
    private final AuthService authService;

    //this is to declare our session user id which we will add a cookie id for the browser to store and remember the user is logged in
    private static final String SESSION_USER_ID = "SESSION_USER_ID";
    //constructor
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    /*
    this will be our register endpoint to create a new user
    our authService will add it to the DB
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody RegisterRequestDTO req){
        //create new user using auth service.register method and then use the DTO fields to create
        User newUser = authService.register(
                req.userName(),
                req.email(),
                req.password(),
                req.firstName(),
                req.lastName(),
                req.birthday()
        );
        //we return a http response to show that it has been created and also the user entity in the form of DTO
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(newUser));

    }

    /*
    this is our login end point, we use our authService.login method
    and then also establish the session for the user to stay logged in
     */
    @PostMapping("/login")
    public ResponseEntity <UserResponseDTO> login(@RequestBody LoginRequestDTO req, HttpSession session){
        //verifying the user name and password
        User authUser = authService.authenticate(req.userName(), req.password());
        //this is where we store the session id for the users browser to store a cookie based on this
        session.setAttribute(SESSION_USER_ID, authUser.getId());
        //we return a http status to clarify its ok
        return ResponseEntity.ok(toResponse(authUser));
    }

    /*
    This is to log out the user and terminate the session with the .invalidate() method
    This will return no content
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.noContent().build();
    }
    /*
    This is to use when logged in to check the user profile, can add languages and interests in future builds
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(HttpSession session){
        Object idObject = session.getAttribute(SESSION_USER_ID);
        //if an object doesnt return it means there is no user logged in
        if(idObject == null){

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // if it doesnt return null we return the user profile
        Long userID = (Long) idObject;
        User loggedInUser = authService.getById(userID);
        //lets http status know that it is ok and return the response DTO
        return ResponseEntity.ok(toResponse(loggedInUser));
    }

    //this method is for mapping the user entity to the DTO so sensitive info never gets revealed
    private static UserResponseDTO toResponse(User user){
        //we return the DTO fields and info inside them BAR from the password hash
        return new UserResponseDTO(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getBirthday()
        );
    }


}
