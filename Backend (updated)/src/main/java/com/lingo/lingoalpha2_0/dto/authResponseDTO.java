package com.lingo.lingoalpha2_0.dto;

public record authResponseDTO(
    String token,
    String type,
    UserResponseDTO user
    ){
}
