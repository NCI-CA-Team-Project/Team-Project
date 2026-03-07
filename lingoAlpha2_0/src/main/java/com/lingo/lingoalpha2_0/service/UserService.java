package com.lingo.lingoalpha2_0.service;

import com.lingo.lingoalpha2_0.entity.User;
import com.lingo.lingoalpha2_0.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    //connects our user repo with this service
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        for(User user: sameLanguageUsers){
            if(!user.getId().equals(currentUser.getId())){
                result.add(user);
            }
        }
        return result;
    }
}
