/*
 * UNIT TEST - Vincentas
 * 
 * This tests if usernames exist in a fake list.
 * 5 users should be true
 * 2 users should not be true
 */

package com.example.web_back_end;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTest {

    //fake list of users in the list
    private final String[] existingUsers = {"Vincent", "Martin", "Cameron", "Amelia", "Jae"};

    //this method checks if the username is in the list
    private boolean userExists(String username) {
        for (String user : existingUsers) {
            if (user.equals(username)) {
                return true;  //found in list
            }
        }
        return false;  //not found in list
    }

    //tests that should pass

    @Test
    public void testExistsById_VincentExists() {
        assertTrue(userExists("Vincent"));  //true Vincent is in list
    }

    @Test
    public void testExistsById_MartinExists() {
        assertTrue(userExists("Martin"));   //true Martin is in list
    }

    @Test
    public void testExistsById_CameronExists() {
        assertTrue(userExists("Cameron"));  //true Cameron is in list
    }

    @Test
    public void testExistsById_AmeliaExists() {
        assertTrue(userExists("Amelia"));   //true Amelia is in list
    }

    @Test
    public void testExistsById_JaeExists() {
        assertTrue(userExists("Jae"));      //true Jae is in list
    }

    // tests that should pass that is not in the list

    @Test
    public void testExistsById_UserDoesNotExist() {
        assertFalse(userExists("Snus1234"));  //false not in list
    }

    @Test
    public void testExistsById_EmptyString() {
        assertFalse(userExists(""));  //false empty not in list
    }
}