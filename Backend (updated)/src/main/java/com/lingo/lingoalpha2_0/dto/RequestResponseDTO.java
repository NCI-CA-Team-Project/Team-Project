package com.lingo.lingoalpha2_0.dto;

public class RequestResponseDTO {
    private Long id;
    private Long userId;
    private String username;
    private String firstName;
    private String lastName;
    private String profileImage;

    public RequestResponseDTO(Long id, Long userId, String username, String firstName, String lastName, String profileImage) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileImage;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getProfileImage() {
        return profileImage;
    }
}
