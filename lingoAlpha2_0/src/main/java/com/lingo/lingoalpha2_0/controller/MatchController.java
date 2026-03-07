package com.lingo.lingoalpha2_0.controller;


import com.lingo.lingoalpha2_0.dto.UserResponseDTO;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchController {
    private final MatchService matchService;
    private final UserRepository userRepository;

    public MatchController(MatchService matchService, UserRepository userRepository){
        this.matchService = matchService;
        this.userRepository = userRepository;
    }

    @PostMapping("/connect/{userId}")
    public ResponseEntity<?> connectUsers(@PathVariable Long userId, @AuthenticationPrincipal UserDetails userDetails){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow();

        matchService.connectUsers(currentUser.getId(), userId);
        return ResponseEntity.ok("Users connected successfully");
    }

    @GetMapping("/my-matches")
    public ResponseEntity<List<UserResponseDTO>> getMyMatches(@AuthenticationPrincipal UserDetails userDetails){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow();

        List<User> matchedUsers = matchService.getMyMatches(currentUser.getId());

        List<UserResponseDTO> response = new ArrayList<>();

        for(User u: matchedUsers){
            response.add(new UserResponseDTO(
                    u.getId(),
                    u.getUsername(),
                    u.getEmail(),
                    u.getFirstName(),
                    u.getLastName(),
                    u.getBirthday(),
                    u.getLearningLanguage()
                    )
            );


        }
        return ResponseEntity.ok(response);
    }
}
