package com.lingo.lingoalpha2_0.dto;

/*
using Data Transfer Objects so we have extra security and are not revelaing
sensitive info directly to the front end
 */

import java.time.LocalDate;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String firstName,
        String lastName,
        LocalDate birthday,
        String learningLanguage
) {
}
