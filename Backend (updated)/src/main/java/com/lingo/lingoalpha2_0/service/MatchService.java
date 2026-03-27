package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.entity.Match;
import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.MatchRepository;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchService {
    //connecting this service to our match and user repo
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;


    public MatchService(MatchRepository matchRepository, UserRepository userRepository) {
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
    }
    //method to connect 2 users, parameters are user1id and user2id
    public void connectUsers(Long userId1, Long userId2){
        //error handling to make user is not connecting to themselves
            if(userId1.equals(userId2)){
                throw new RuntimeException("Cannot connect a user to themselves");
            }
            //boolean expression to make users are not already matched using method from match repo
            boolean alreadyMatched = matchRepository.findMatchBetween(userId1, userId2).isPresent();

            if (alreadyMatched) {
                throw new RuntimeException("Users are already matched");
            }

            //create new match entity and save it to match repo
                Match newMatch = new Match(userId1, userId2);
                matchRepository.save(newMatch);


        }
    //method to get all the current users matches
    public List<User> getMyMatches(Long currentUserId){
        //create a list of type match entity with results from the match repo using the current user id
            List<Match> matches = matchRepository.findByUser1IdOrUser2Id(currentUserId, currentUserId);


            List<User> matchedUsers = new ArrayList<>();
            //enhanced for loop to loop through all the matches
            for(Match m: matches){
                Long otherUserId;

                //to establish which side of the conversation user is on
                if(m.getUser1Id().equals(currentUserId)){
                    otherUserId = m.getUser2Id();
                }else{
                    otherUserId = m.getUser1Id();
                }
            //get the other user from the user repo
                User otherUser = userRepository.findById(otherUserId)
                        .orElseThrow(() -> new RuntimeException("User not found"));




            //add the other user to the list
                  matchedUsers.add(otherUser);
 }
            return matchedUsers;
        }
    }

