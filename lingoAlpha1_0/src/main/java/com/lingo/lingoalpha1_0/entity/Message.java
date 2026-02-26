package com.lingo.lingoalpha1_0.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
//new table to store messages,
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//this is how we identify the messages by the sender and receiver id, this allows us to pull up previous conversations

    @Column(nullable = false)
    private Long senderId;
    @Column(nullable = false)
    private Long receiverId;

    //message content and time stamp
    @Column(nullable = false, length = 2000)
    private String messageContent;

    @Column(nullable = false)
    private LocalDateTime messageTime;

    public Message(){}

    public Message(Long senderId, Long receiverId, String messageContent){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.messageContent = messageContent;
        this.messageTime = LocalDateTime.now();
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public LocalDateTime getMessageTime() {
        return messageTime;
    }

    public void setMessageTime(LocalDateTime messageTime) {
        this.messageTime = messageTime;
    }
}
