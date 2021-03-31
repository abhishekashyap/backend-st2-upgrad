package com.abhishekashyap.backend_st2_upgrad.service;

import com.abhishekashyap.backend_st2_upgrad.model.User;
import com.abhishekashyap.backend_st2_upgrad.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }
}
