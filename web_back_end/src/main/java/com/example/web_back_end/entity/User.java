/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.User to edit this template
 */
package com.example.web_back_end.entity;

import jakarta.persistence.*;   // allows you to use JPA annotation (@Entity, @Table, @Id, etc.)
import java.sql.Date;           // allows you to use Date type

/**
 *
 * @author ABC
 */

@Entity // tells Sping/JPA that this class is mapped to a DB table
@Table(name = "Users")  // specify the table
public class User {
    @Id // tells Spring/JPA that this is the primary key
    @Column(name = "ID")
    private String id;
    
    @Column(name = "Password_hash")
    private String passwordHash;
    
    @Column(name = "FirstName")
    private String firstName;
    
    @Column(name = "LastName")
    private String lastName;
    
    @Column(name = "Email")
    private String email;
    
    @Column(name = "Birthday")
    private Date birthday;
    
    // setter and getter
    public void setId(String id) { this.id = id; }
    public String getId() { return id; }
    
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getPasswordHash() { return passwordHash; }
    
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getFirstName() { return firstName; }
    
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getLastName() { return lastName; }
    
    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return email; }
    
    public void setBirthday(Date birthday) { this.birthday = birthday; }
    public Date getBirthday() { return birthday; }
}
