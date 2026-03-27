package com.lingo.lingoalpha2_0.repository;

import com.lingo.lingoalpha2_0.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    boolean existsByEmailIgnoreCase(String email);

    List<User> findByLearningLanguage(String learningLanguage);
}
