/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.UserRepository to edit this template
 */
package com.example.web_back_end.repository;

import com.example.web_back_end.entity.User;    // import User class (to use User class as an parameter)
import org.springframework.data.jpa.repository.JpaRepository;   // import JpaRepository

/**
 *
 * @author ABC
 */
public interface UserRepository extends JpaRepository<User, String> {  // here User means the entity "User" 
                                                                       // and String means the type of "Primary Key"
                                                                       // the table Users has ID column, which is the primary key and is String type
    
}


// JpaRepository already provides basic CRUD methods (save, findById, findAll, delete, etc.)
// so we don't need to add anything to it.