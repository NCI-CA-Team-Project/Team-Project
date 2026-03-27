package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.entity.Message;
import com.lingo.lingoalpha2_0.repository.MatchRepository;
import com.lingo.lingoalpha2_0.repository.MessageRepository;
import org.springframework.stereotype.Service;
import com.lingo.lingoalpha2_0.dto.ConversationPreviewDTO;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import com.lingo.lingoalpha2_0.entity.User;
import java.util.*;

import java.util.List;

@Service
public class MessageService {
//connecting this message service with our message and match repo
    private final MessageRepository messageRepository;
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;
    
    public MessageService(MessageRepository messageRepository, MatchRepository matchRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
    }
//this is the function to send a message
    public Message sendMessage(Long senderId, Long receiverId, String messageContent){

        //this is to check if the user is in a match, if they are then we can send the message
        boolean usersMatched = matchRepository.findMatchBetween(senderId, receiverId).isPresent();
//if users aren't matched we throw a run time exception
        if(!usersMatched){
            //throw new exits the current method when if is executed
            throw new RuntimeException("Users are not matched!");
        }
        // create new message entity
        Message message = new Message(senderId, receiverId, messageContent);
        //save that entity to the database
        return messageRepository.save(message);
    }
//this is to get our messages, we will use the method from the repo to pull our messages and then use a loop to make sure they are between the 2 users and list them
    public List<Message> getConversation(Long senderId, Long receiverId){
        List<Message> messages = messageRepository.findConversation(senderId, receiverId);
        //this is to check if the user is in a match, if they are then we can pull the message ( ADDITIONAL ERROR HANDLING )
        boolean usersMatched = matchRepository.findMatchBetween(senderId, receiverId).isPresent();
        if(!usersMatched){
            throw new RuntimeException("Users are not matched!");
        }

        return messages;
    }
    
    
    public List<ConversationPreviewDTO> getConversationPreviews(Long currentUserId){

    List<Message> messages = messageRepository.findAllMessagesForUser(currentUserId);

    Map<Long, ConversationPreviewDTO> conversations = new LinkedHashMap<>();

    for (Message m : messages){

        Long otherUserId;

        if(m.getSenderId().equals(currentUserId)) {
            otherUserId = m.getReceiverId();
        } else{
            otherUserId = m.getSenderId();
        }

        //only take the latest message per user
        if(!conversations.containsKey(otherUserId)){

            User otherUser = userRepository.findById(otherUserId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            conversations.put(otherUserId, new ConversationPreviewDTO(
                    otherUserId,
                    otherUser.getUsername(),
                    otherUser.getFirstName(),
                    otherUser.getLastName(),
                    m.getMessageContent(),
                    m.getMessageTime()
            ));
        }
    }

        return new ArrayList<>(conversations.values());
    }
    
    
}
