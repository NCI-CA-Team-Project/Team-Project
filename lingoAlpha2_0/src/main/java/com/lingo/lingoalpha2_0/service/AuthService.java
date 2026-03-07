package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.dto.RegisterRequestDTO;
import com.lingo.lingoalpha2_0.dto.UserResponseDTO;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    public AuthService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public UserResponseDTO register(RegisterRequestDTO registerRequest){
        log.info("Service reached: registering user {}", registerRequest.username());
        if(userRepository.existsByUsername(registerRequest.username())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already taken");
        }

        log.info("Username check passed");
        if(userRepository.existsByEmailIgnoreCase(registerRequest.email())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already taken");
        }
        log.info("Email check passed");


        if (registerRequest.birthday().isAfter(LocalDate.now().minusYears(18))) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "You must be at least 18 years old"
            );

        }
        log.info("Age check passed");

        User newUser = new User();
        newUser.setUsername(registerRequest.username());
        newUser.setPassword(encoder.encode(registerRequest.password()));
        newUser.setEmail(registerRequest.email());
        newUser.setFirstName(registerRequest.firstName());
        newUser.setLastName(registerRequest.lastName());
        newUser.setBirthday(registerRequest.birthday());
        newUser.setLearningLanguage(registerRequest.learningLanguage());
        log.info("Saving user to database");
        User savedUser = userRepository.save(newUser);
        log.info("User saved with id {}", savedUser.getId());

        return new UserResponseDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail(), savedUser.getFirstName(), savedUser.getLastName(),  savedUser.getBirthday(), savedUser.getLearningLanguage());




    }

}
