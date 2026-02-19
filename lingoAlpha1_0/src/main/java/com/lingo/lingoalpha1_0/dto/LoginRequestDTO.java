package com.lingo.lingoalpha1_0.dto;
/*
using Data Transfer Objects so we have extra security and are not revelaing
sensitive info directly to the front end
 */
public record LoginRequestDTO(String userName, String password) {
}
