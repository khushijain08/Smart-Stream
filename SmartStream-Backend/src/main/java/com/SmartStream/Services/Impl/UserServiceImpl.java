package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.User;
import com.SmartStream.Repositories.UserRepo;
import com.SmartStream.Services.UserService;
import com.SmartStream.payloads.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;

    private PasswordEncoder passwordEncoder;


//    @Override
//    public UserDto createUser(UserDto userDto) {
//        User user = dtoToUser(userDto);
//        User savedUser = userRepo.save(user);
//        return userToDto(savedUser);
//    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map(this::userToDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return userToDto(user);
    }

    @Override
    public UserDto updateUserByUsername(String username, UserDto userDto) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        // Update user details manually
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
//        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setContact(userDto.getContact());
        user.setDob(userDto.getDob());
        user.setCountry(userDto.getCountry());
        user.setGender(userDto.getGender());
        user.setCategory(userDto.getCategory());

        User updatedUser = userRepo.save(user);
        return userToDto(updatedUser);
    }


    @Override
    public void deleteUserByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        userRepo.delete(user);
    }

    // Helper methods to convert between User and UserDto
    private User dtoToUser(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    private UserDto userToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
    @Override
    public boolean authenticateUser(String username, String password) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return user.getPassword().equals(password);
    }


    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepo.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
            }
        };


    }



}
