package com.lingo.lingoalpha1_0.repository;

import com.lingo.lingoalpha1_0.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    //this queries our database to get messages from two matched users
    @Query("""
    SELECT m FROM Message m
    WHERE (m.senderId = :senderId AND m.receiverId = :receiverId)
       OR (m.senderId = :receiverId AND m.receiverId = :senderId)
    ORDER BY m.messageTime ASC
""")
    List<Message> findConversation(Long senderId, Long receiverId);
}

