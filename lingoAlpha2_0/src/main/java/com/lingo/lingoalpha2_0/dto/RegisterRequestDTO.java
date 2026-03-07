package com.lingo.lingoalpha2_0.dto;
/*
using Data Transfer Objects so we have extra security and are not revelaing
sensitive info directly to the front end
 */
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record RegisterRequestDTO(

        @NotBlank(message = "Username cannot be empty")
        String username,

        @NotBlank(message = "Password cannot be empty")
        @Size(min = 6, message = "Password must be at least 6 characters")
        String password,

        @Email(message = "Invalid email format")
        @NotBlank(message = "Email cannot be empty")
        String email,

        @NotBlank(message = "First name cannot be empty")
        String firstName,

        @NotBlank(message = "Last name cannot be empty")
        String lastName,

        @NotNull(message = "Birthday cannot be empty")
        @Past(message = "Birthday must be in the past")
        LocalDate birthday,

        @NotBlank(message = "Learning language cannot be empty")
        String learningLanguage) {
}
