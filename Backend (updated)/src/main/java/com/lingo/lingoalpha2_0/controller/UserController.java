package com.lingo.lingoalpha2_0.controller;

import com.lingo.lingoalpha2_0.dto.UserResponseDTO;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lingo.lingoalpha2_0.dto.UpdateProfileDTO;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository){
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/browse")
    public ResponseEntity<List<UserResponseDTO>> browseUsers(@AuthenticationPrincipal UserDetails userDetails){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow();

        List<User> users = userService.browserUsers(currentUser);

        List<UserResponseDTO> response = new ArrayList<>();

        for(User u: users){
            response.add(new UserResponseDTO(
                    u.getId(),
                    u.getUsername(),
                    u.getEmail(),
                    u.getFirstName(),
                    u.getLastName(),
                    u.getBirthday(),
                    u.getLearningLanguage(),
                    u.getProfileImage(),
                    u.getAbout()
            ));
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
            .orElseThrow();

        UserResponseDTO response = new UserResponseDTO(
            currentUser.getId(),
            currentUser.getUsername(),
            currentUser.getEmail(),
            currentUser.getFirstName(),
            currentUser.getLastName(),
            currentUser.getBirthday(),
            currentUser.getLearningLanguage(),
            currentUser.getProfileImage(),
            currentUser.getAbout()
        );

        return ResponseEntity.ok(response);
    }
    
    
    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateMyProfile(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UpdateProfileDTO updateProfileDTO
    ){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
            .orElseThrow();

        currentUser.setFirstName(updateProfileDTO.firstName());
        currentUser.setLastName(updateProfileDTO.lastName());
        currentUser.setLearningLanguage(updateProfileDTO.learningLanguage());
        currentUser.setAbout(updateProfileDTO.about());
        currentUser.setProfileImage(updateProfileDTO.profileImage());

        User savedUser = userRepository.save(currentUser);

        UserResponseDTO response = new UserResponseDTO(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getBirthday(),
            savedUser.getLearningLanguage(),
            savedUser.getProfileImage(),
            savedUser.getAbout()
        );

        return ResponseEntity.ok(response);
    }
    
}
