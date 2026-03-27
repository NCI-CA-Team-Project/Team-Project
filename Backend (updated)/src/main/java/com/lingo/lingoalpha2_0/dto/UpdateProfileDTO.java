/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lingo.lingoalpha2_0.dto;

/**
 *
 * @author Cam
 */
public record UpdateProfileDTO(
        String firstName,
        String lastName,
        String learningLanguage,
        String about,
        String profileImage
){
}
