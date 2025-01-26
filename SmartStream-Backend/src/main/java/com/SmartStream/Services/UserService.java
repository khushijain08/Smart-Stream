package com.SmartStream.Services;

import com.SmartStream.payloads.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
//    UserDto createUser(UserDto userDto);
    List<UserDto> getAllUsers();
    UserDto getUserByUsername(String username);
    UserDto updateUserByUsername(String username, UserDto userDto);
    void deleteUserByUsername(String username);

    boolean authenticateUser(String userName, String password);
    UserDetailsService userDetailsService();
}
