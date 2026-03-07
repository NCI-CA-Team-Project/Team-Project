package com.lingo.lingoalpha2_0.dto;
/*
using Data Transfer Objects so we have extra security and are not revelaing
sensitive info directly to the front end
 */
public record LoginRequestDTO(
        String username,
        String password) {
}
