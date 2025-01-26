package com.SmartStream.payloads;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {

    private String token;
    private String refreshToken;

    private UserDto user;


}
