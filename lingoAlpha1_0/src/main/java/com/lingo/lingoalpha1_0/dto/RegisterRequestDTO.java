package com.lingo.lingoalpha1_0.dto;
/*
using Data Transfer Objects so we have extra security and are not revelaing
sensitive info directly to the front end
 */
import java.time.LocalDate;

public record RegisterRequestDTO(
        String userName,
        String password,
        String email,
        String firstName,
        String lastName,
        LocalDate birthday
) {
}
