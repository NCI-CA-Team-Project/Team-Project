package com.lingo.lingoalpha2_0.controller;


import com.lingo.lingoalpha2_0.dto.UserResponseDTO;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.service.MatchService;
import com.lingo.lingoalpha2_0.entity.Match;
import com.lingo.lingoalpha2_0.dto.RequestResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
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
        return ResponseEntity.ok("Request sent successfully");
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
                    u.getLearningLanguage(),
                    u.getProfileImage(),
                    u.getAbout()
                    )
            );


        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/requests")
    public ResponseEntity<List<RequestResponseDTO>> getMyRequests(@AuthenticationPrincipal UserDetails userDetails){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
            .orElseThrow();

        List<Match> requests = matchService.getPendingRequestMatches(currentUser.getId());
        List<RequestResponseDTO> response = new ArrayList<>();

        for (Match match : requests) {
            User sender = userRepository.findById(match.getUser1Id())
                .orElseThrow();

            response.add(new RequestResponseDTO(
                match.getId(),
                sender.getId(),
                sender.getUsername(),
                sender.getFirstName(),
                sender.getLastName(),
                sender.getProfileImage()
            ));
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/accept/{matchId}")
    public ResponseEntity<?> acceptRequest(@PathVariable Long matchId){
        matchService.acceptRequest(matchId);
        return ResponseEntity.ok("Request accepted successfully");
    }

    @PostMapping("/decline/{matchId}")
    public ResponseEntity<?> declineRequest(@PathVariable Long matchId){
        matchService.declineRequest(matchId);
        return ResponseEntity.ok("Request declined successfully");
    }

}
