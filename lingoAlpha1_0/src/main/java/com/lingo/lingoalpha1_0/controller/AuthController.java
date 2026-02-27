package com.lingo.lingoalpha1_0.controller;

import com.lingo.lingoalpha1_0.entity.User;
import com.lingo.lingoalpha1_0.dto.LoginRequestDTO;
import com.lingo.lingoalpha1_0.dto.RegisterRequestDTO;
import com.lingo.lingoalpha1_0.dto.UserResponseDTO;
import com.lingo.lingoalpha1_0.repository.UserRepository;
import com.lingo.lingoalpha1_0.security.JwtService;
import com.lingo.lingoalpha1_0.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/auth") // this is to prefix these to each of our paths
public class AuthController {
    //declaring auth service, private so it can only be referenced once
    private final AuthService authService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;


    //constructor
    public AuthController(AuthService authService, UserRepository userRepository, AuthenticationManager authenticationManager){
        this.authService = authService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;

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
    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {

        User user = authService.authenticate(
                request.userName(),
                request.password()
        );

        String token = JwtService.generateToken(user.getUserName());

        return ResponseEntity.ok(token);
    }

    /*
    This is to log out the user and terminate the session with the .invalidate() method
    This will return no content
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session){

        return ResponseEntity.noContent().build();
    }
    /*
    This is to use when logged in to check the user profile, can add languages and interests in future builds
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(
            Authentication authentication) {

        String username = authentication.getName();

        User user = userRepository.findByUserName(username)
                .orElseThrow();

        return ResponseEntity.ok(toResponse(user));
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
