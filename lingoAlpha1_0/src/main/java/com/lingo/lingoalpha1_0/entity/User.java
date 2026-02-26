package com.lingo.lingoalpha1_0.entity;

import jakarta.persistence.*;   // allows you to use JPA annotation (@Entity, @Table, @Id, etc.)
import java.time.LocalDate;           // allows you to use Datetype

/**
 *
 * @author ABC
 */

@Entity // tells Sping/JPA that this class is mapped to a DB table
@Table(name = "Users")  // specify the table
public class User {
    @Id // tells Spring/JPA that this is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false, updatable = false)
    private Long id;

    @Column(name = "UserName")
    private String userName;

    @Column(name = "Password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Birthday")
    private LocalDate birthday;

    @Column(name = "LearningLanguage")
    private String learningLanguage;

    public String getLearningLanguage() {
        return learningLanguage;
    }

    public void setLearningLanguage(String learningLanguage) {
        this.learningLanguage = learningLanguage;
    }

    // setter and getter
    public void setId(Long id) { this.id = id; }
    public Long getId() { return id; }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getUserName(){
        return userName;
    }

    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getPasswordHash() { return passwordHash; }

    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getFirstName() { return firstName; }

    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getLastName() { return lastName; }

    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return email; }

    public void setBirthday(LocalDate birthday) { this.birthday = birthday; }
    public LocalDate getBirthday() { return birthday; }
}

