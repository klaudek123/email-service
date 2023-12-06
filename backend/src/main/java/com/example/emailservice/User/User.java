package com.example.emailservice.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@Table(name="_user")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String email;
    private String name;
    private String lastname;
    @Column(columnDefinition = "DATE")
    private LocalDate dateOfBirth;
    private String sex;
    private String password;

}
