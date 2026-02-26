package com.lingo.lingoalpha1_0.repository;

import com.lingo.lingoalpha1_0.entity.User; // import the user entity that we created
import org.springframework.data.jpa.repository.JpaRepository; // jpa repository features

import java.util.List;
import java.util.Optional; // java optional wrapper that we will use for findByUserName

public interface UserRepository extends JpaRepository<User, Long> {

    //optional wrapper used here, if user is found it returns the user object if null it doesn't crash the app
    Optional<User> findByUserName(String username);
    //we will be using the next two methods for registration
    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    // added afterwards to help with matching logic
    List<User> findByLearningLanguage(String learningLanguage);
}
