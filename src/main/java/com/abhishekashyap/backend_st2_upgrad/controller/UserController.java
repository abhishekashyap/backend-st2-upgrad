package com.abhishekashyap.backend_st2_upgrad.controller;

import com.abhishekashyap.backend_st2_upgrad.model.User;
import com.abhishekashyap.backend_st2_upgrad.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/addUser")
    public User storeUser(@RequestBody User aUser) {
        return userRepository.save(aUser);
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}
