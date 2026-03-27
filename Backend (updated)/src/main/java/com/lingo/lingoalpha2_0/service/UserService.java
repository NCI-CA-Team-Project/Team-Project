package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.lingo.lingoalpha2_0.repository.MatchRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    //connects our user repo with this service
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;

    public UserService(UserRepository userRepository,MatchRepository matchRepository) {
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
    }

    /*
    this method will be used in our user controller to return a list of users who have the same learning language
     the parameter we use is the current user
     */
    public List<User> browserUsers(User currentUser){

        //we return a list from the database of users that share the same learning language as the current user
        List<User> sameLanguageUsers = userRepository.findByLearningLanguage(currentUser.getLearningLanguage());

        List<User> result = new ArrayList<User>();
        //enhanced for loop to make sure that we do not add ourself ( the current user ) to the browse list
        for (User user : sameLanguageUsers) {
            boolean isCurrentUser = user.getId().equals(currentUser.getId());
            boolean alreadyMatched = matchRepository.findMatchBetween(currentUser.getId(), user.getId()).isPresent();

            if (!isCurrentUser && !alreadyMatched) {
                result.add(user);
            }
        }
        
        return result;
    }
}
