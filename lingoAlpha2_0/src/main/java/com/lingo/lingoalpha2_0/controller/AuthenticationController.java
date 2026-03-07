package com.lingo.lingoalpha2_0.controller;


import com.lingo.lingoalpha2_0.dto.LoginRequestDTO;
import com.lingo.lingoalpha2_0.dto.RegisterRequestDTO;
import com.lingo.lingoalpha2_0.dto.UserResponseDTO;
import com.lingo.lingoalpha2_0.dto.authResponseDTO;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.security.JwtUtil;
import com.lingo.lingoalpha2_0.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private  final UserRepository userRepository;
    private final AuthService authService;
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @PostMapping("/signin")
    public authResponseDTO authenticateUser(@RequestBody LoginRequestDTO loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )

        );


        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUsername());
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(()-> new RuntimeException("User not found"));

        UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getBirthday(), user.getLearningLanguage());

        return new authResponseDTO(
                token,
                "Bearer",
                userResponseDTO
        );
    }

    @PostMapping("/signup")
    public UserResponseDTO registerUser(@Valid @RequestBody RegisterRequestDTO registerRequest){
        log.info("Controller reached: /signup");
        return authService.register(registerRequest);
    }
}
