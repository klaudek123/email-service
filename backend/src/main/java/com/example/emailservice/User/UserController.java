package com.example.emailservice.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserRepository userRepository;

    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("email") String email) {
        return userService.getUserByEmail(email)
                .map(userDTO -> new ResponseEntity<>(userDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userRepository.existsById(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Email already exists
        }
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();
        if (userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())) {
            response.put("message", "Zalogowano pomyślnie!");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Błąd logowania. Sprawdź email i hasło.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User userDetails) {
        return userRepository.findById(email)
                .map(user -> {
                    user.setName(userDetails.getName());
                    user.setLastname(userDetails.getLastname());
                    user.setDateOfBirth(userDetails.getDateOfBirth());
                    user.setSex(userDetails.getSex());
                    user.setPassword(userDetails.getPassword());
                    User updatedUser = userRepository.save(user);
                    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        userRepository.deleteById(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
