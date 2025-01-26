package com.SmartStream.payloads;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SigninRequest {

    @NotEmpty(message = "Username is required")
    private String userName;

    @NotEmpty(message = "Password is required")
    private String password;
}
