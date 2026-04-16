/*
*UNIT TEST - UserRepositoryTest.java
*Author: Vincentas
*Date: 2026-04-16
*
*Reference: JUnit 5 User Guide https://junit.org/junit5/docs/current/user-guide/
*
*These tests verify the existsById() method in UserRepository.
*The method checks if a user exists in the database by their ID.
*/

package com.example.web_back_end;

//import JUnit assertions (true/false)
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.web_back_end.repository.UserRepository;

/*
*@SpringBootTest Loads the whole Spring application for testing
*This is needed so Spring knows about the database connection
*/

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    /*
    *This test checks if a real user called "TheFourth4" exists.
    *If the user exists, existsById() it should return true.
    */

    @Test
    public void testExistsById_UserExists() {
        boolean exists = userRepository.existsById("TheFourth4");
        assertTrue(exists);
    }

    /*
    *This test checks if a fake user called "Snus1234" exists.
    *This user is not in the database, so existsById() it should return false.
    */

    @Test
    public void testExistsById_UserDoesNotExist() {
        boolean exists = userRepository.existsById("Snus1234");
        assertFalse(exists);
    }

    /*
    *This test passes an empty string as the ID.
    *Empty ID is invalid, so existsById() it should return false.
    */

    @Test
    public void testExistsById_EmptyId() {
        boolean exists = userRepository.existsById("");
        assertFalse(exists);
    }

    /*
    *This test passes null as the ID.
    *null is invalid, so existsById() it should return false.
    */

    @Test
    public void testExistsById_NullId() {
        boolean exists = userRepository.existsById(null);
        assertFalse(exists);
    }
}