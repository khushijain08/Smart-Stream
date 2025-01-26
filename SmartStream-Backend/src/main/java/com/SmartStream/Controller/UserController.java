package com.SmartStream.Controller;

import com.SmartStream.Repositories.UserRepo;
import com.SmartStream.Services.Impl.UserServiceImpl;
import com.SmartStream.Entities.User;
import com.SmartStream.Services.UserService;
import com.SmartStream.payloads.SignInDto;
import com.SmartStream.payloads.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;



//    // POST - create user
//   @PostMapping("/createuser")
//   public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
//       UserDto createdUser = userService.createUser(userDto);
//       return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
//   }

    // GET - Get all users
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // GET - Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto user = userService.getUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // PUT - Update user by username
    @PutMapping("/username/{username}")
    public ResponseEntity<UserDto> updateUserByUsername(@PathVariable String username, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUserByUsername(username, userDto);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // DELETE - Delete user by username
    @DeleteMapping("/username/{username}")
    public ResponseEntity<Void> deleteUserByUsername(@PathVariable String username) {
        userService.deleteUserByUsername(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping("/signup")
//    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto) {
//        try {
//            UserDto registeredUser = userService.createUser(userDto);
//            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Handle error appropriately
//        }
//    }

//    @PostMapping("/signin")
//    public ResponseEntity<String> signinUser(@Valid @RequestBody SignInDto signinDto) {
//        boolean isAuthenticated = userService.authenticateUser(signinDto.getUserName(), signinDto.getPassword());
//        if (isAuthenticated) {
//            // Generate and return JWT or session token here if needed
//            return new ResponseEntity<>("Signin successful", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
//        }
//    }
}
