package com.example.emailservice.User;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {
    Optional<Object> findByEmailAndPassword(String email, String password);
}
