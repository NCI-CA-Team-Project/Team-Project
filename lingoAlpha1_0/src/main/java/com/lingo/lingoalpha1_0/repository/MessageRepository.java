package com.lingo.lingoalpha1_0.repository;

import com.lingo.lingoalpha1_0.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    //this queries our database to get messages from two matched users
    @Query("""
        SELECT m FROM Message m
        WHERE (m.senderId = :user1 AND m.receiverId = :user2)
           OR (m.senderId = :user2 AND m.receiverId = :user1)
        ORDER BY m.messageTime ASC
    """)
    List<Message> findConversation(Long SenderId, Long ReceiverId);
}

