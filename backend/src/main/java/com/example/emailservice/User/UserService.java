package com.example.emailservice.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDTO> getUserByEmail(String email) {
        Optional<User> user = userRepository.findById(email);

        return user.map(u -> new UserDTO(u.getEmail(), u.getName(), u.getLastname()));
    }

    public User createUser(User user) throws Exception {
        if (userRepository.existsById(user.getEmail())) {
            // Możesz dodać tutaj obsługę konfliktu, jeśli to konieczne
            throw new Exception("User with this email already exists.");
        }
        return userRepository.save(user);
    }

    public Optional<User> updateUser(String email, User userDetails) {
        return userRepository.findById(email)
                .map(user -> {
                    user.setName(userDetails.getName());
                    user.setLastname(userDetails.getLastname());
                    user.setDateOfBirth(userDetails.getDateOfBirth());
                    user.setSex(userDetails.getSex());
                    user.setPassword(userDetails.getPassword());
                    return userRepository.save(user);
                });
    }

    public void deleteUser(String email) {
        userRepository.deleteById(email);
    }

    public boolean authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).isPresent();
    }
}
