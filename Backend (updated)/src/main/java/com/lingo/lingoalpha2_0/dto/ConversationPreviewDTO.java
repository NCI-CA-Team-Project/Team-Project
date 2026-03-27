/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lingo.lingoalpha2_0.dto;
import java.time.LocalDateTime;
/**
 *
 * @author Cam
 */
public record ConversationPreviewDTO(
        Long otherUserId,
        String username,
        String firstName,
        String lastName,
        String lastMessage,
        LocalDateTime messageTime 
){}


