package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.dto.MessageResponseDTO;
import com.lingo.lingoalpha2_0.entity.Message;
import com.lingo.lingoalpha2_0.repository.MatchRepository;
import com.lingo.lingoalpha2_0.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MessageService {
//connecting this message service with our message and match repo
    private final MessageRepository messageRepository;
    private final MatchRepository matchRepository;

    public MessageService(MessageRepository messageRepository, MatchRepository matchRepository) {
        this.messageRepository = messageRepository;
        this.matchRepository = matchRepository;
    }
//this is the function to send a message
    public Message sendMessage(Long senderId, Long receiverId, String messageContent){

        //this is to check if the user is in a match, if they are then we can send the message
        boolean usersMatched = matchRepository.findMatchBetween(senderId, receiverId).isPresent();
//if users aren't matched we throw a run time exception
        if(!usersMatched){
            //throw new exits the current method when if is executed
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Users must be matched to message"
            );
        }
        // create new message entity
        Message message = new Message(senderId, receiverId, messageContent);
        //save that entity to the database
        return messageRepository.save(message);
    }
//this is to get our messages, we will use the method from the repo to pull our messages and then use a loop to make sure they are between the 2 users and list them
    public List<Message> getConversation(Long senderId, Long receiverId){
        boolean usersMatched = matchRepository.findMatchBetween(senderId, receiverId).isPresent();
        List<Message> messages = messageRepository.findConversation(senderId, receiverId);
        //this is to check if the user is in a match, if they are then we can pull the message ( ADDITIONAL ERROR HANDLING )

        if(!usersMatched){
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Users must be matched to message"
            );
        }

        return messages;
    }

    public MessageResponseDTO mapToDTO(Message message){
        return new MessageResponseDTO(message.getId(),
                message.getSenderId(),
                message.getReceiverId(),
                message.getMessageContent(),
                message.getMessageTime()
                );
    }
}
