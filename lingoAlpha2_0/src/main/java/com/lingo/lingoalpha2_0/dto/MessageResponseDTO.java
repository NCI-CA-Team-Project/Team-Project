package com.lingo.lingoalpha2_0.dto;

import java.time.LocalDateTime;

public record MessageResponseDTO(
        Long id,
        Long senderId,
        Long receiverId,
        String messageContent,
        LocalDateTime messageTime
) {}
