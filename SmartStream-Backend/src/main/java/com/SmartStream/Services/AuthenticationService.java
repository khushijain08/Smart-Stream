package com.SmartStream.Services;


import com.SmartStream.payloads.*;

public interface AuthenticationService {

    public UserDto createUser(UserDto userDto);

    JwtAuthenticationResponse signin(SigninRequest signinRequest) throws Exception;

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}
