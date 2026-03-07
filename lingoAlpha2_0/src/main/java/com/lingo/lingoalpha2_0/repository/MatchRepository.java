package com.lingo.lingoalpha2_0.repository;

import com.lingo.lingoalpha2_0.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("""
        SELECT m FROM Match m
        WHERE (m.user1Id = :user1 AND m.user2Id = :user2)
           OR (m.user1Id = :user2 AND m.user2Id = :user1)
    """)
    Optional<Match> findMatchBetween(Long user1, Long user2);

    List<Match> findByUser1IdOrUser2Id(Long userId1, Long userId2);

    List<Match> findByUser1IdAndUser2Id(Long userId1, Long userId2);
}
