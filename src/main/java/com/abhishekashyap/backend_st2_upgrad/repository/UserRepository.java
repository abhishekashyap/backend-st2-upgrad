package com.abhishekashyap.backend_st2_upgrad.repository;

import com.abhishekashyap.backend_st2_upgrad.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
