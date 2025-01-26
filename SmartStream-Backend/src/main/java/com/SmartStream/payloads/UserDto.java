package com.SmartStream.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Long id;

    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "Username is required")
    @Size(min = 3, message = "Username should have at least 3 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_-]{3,15}$", message = "Username must be 3-15 characters long and can only contain letters, numbers, underscores, or hyphens")
    private String username;

    @Email(message = "Email should be valid")

    @NotEmpty(message = "Email is required")
    private String email;

    @NotEmpty(message = "Password is required")
    @Size(min = 5, message = "Password should have at least 5 characters")
    private String password;

    @NotEmpty(message = "Contact is required")
    @Size(min = 10,message = "Provide valid mobile number")
    private String contact;

    private Date dob;

    private String country;

    private String gender;

    private String category;


}