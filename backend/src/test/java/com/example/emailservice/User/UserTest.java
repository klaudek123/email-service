package com.example.emailservice.User;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

class UserTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testGetAllUsers() {
        List<User> users = Arrays.asList(
                new User("email1@fast.com", "Jan", "Nowak", LocalDate.now(), "male", "password1"),
                new User("email2@fast.com", "Marek", "Kowalski", LocalDate.now(), "female", "password2")
        );

        Mockito.when(userService.getAllUsers()).thenReturn(users);

        List<User> result = userController.getAllUsers();

        assertEquals(2, result.size());
    }


    @Test
    public void testGetUserByEmail() {
        UserDTO userDTO = new UserDTO("email@fast.com", "Jan", "Nowak");

        when(userService.getUserByEmail(Mockito.anyString())).thenReturn(Optional.of(userDTO));

        ResponseEntity<UserDTO> result = userController.getUserByEmail("email@fast.com");

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertNotNull(result.getBody());
        assertEquals("Jan", result.getBody().getName());
    }

    @Test
    public void testUpdateUser() {
        User userDetails = new User("email@fast.com", "Updated", "Nowak", LocalDate.now(), "female", "newpassword");
        User existingUser = new User("email@fast.com", "Jan", "Nowak", LocalDate.now(), "male", "password");

        Mockito.when(userRepository.findById(Mockito.anyString())).thenReturn(Optional.of(existingUser));
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(userDetails);

        ResponseEntity<User> result = userController.updateUser("email@fast.com", userDetails);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertNotNull(result.getBody());
        assertEquals("Updated", result.getBody().getName());
        assertEquals("newpassword", result.getBody().getPassword());
    }

}