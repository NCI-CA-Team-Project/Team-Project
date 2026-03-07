package com.lingo.lingoalpha2_0.controller;

import com.lingo.lingoalpha2_0.dto.SendMessageRequestDTO;
import com.lingo.lingoalpha2_0.entity.Message;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")// this is to prefix these to each of our paths
public class MessageController {
    //declaring our message service(final) so it can only be referenced once
    private final MessageService messageService;
    private final UserRepository userRepository;

    public MessageController(MessageService messageService, UserRepository userRepository){
        this.messageService = messageService;
        this.userRepository = userRepository;
    }

//sending a message
    @PostMapping("/send/{receiverId}")
    public ResponseEntity<Message> sendMessage(@PathVariable Long receiverId, @RequestBody SendMessageRequestDTO sendMessageRequestDTO, @AuthenticationPrincipal UserDetails userDetails){
        User sender = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        Message message = messageService.sendMessage(sender.getId(), receiverId, sendMessageRequestDTO.messageContent());

        return ResponseEntity.ok(message);
    }

    //getting a conversation
    //need to change the response to a message response DTO
    @GetMapping("/{otherUserId}")
    public ResponseEntity<List<Message>> getConversation(@PathVariable Long otherUserId, @AuthenticationPrincipal UserDetails userDetails){
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        List<Message> conversation = messageService.getConversation(currentUser.getId(), otherUserId);



        return ResponseEntity.ok(conversation);
    }
}
