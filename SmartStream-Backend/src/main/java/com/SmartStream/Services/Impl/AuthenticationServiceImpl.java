package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.User;
import com.SmartStream.Repositories.UserRepo;
import com.SmartStream.Services.AuthenticationService;
import com.SmartStream.Services.JWTService;
import com.SmartStream.Services.UserService;
import com.SmartStream.exceptions.ApiException;
import com.SmartStream.payloads.JwtAuthenticationResponse;
import com.SmartStream.payloads.RefreshTokenRequest;
import com.SmartStream.payloads.SigninRequest;
import com.SmartStream.payloads.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private final UserRepo userRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AuthenticationManager authenticationManager;



@Autowired
    private ModelMapper modelMapper;



    @Autowired
    private final JWTService jwtService;
//    private ObservationFilter mapper;


@Autowired
    private UserService userService;
//    public User signup(SignUpRequest signUpRequest){
//        User user = new User();
//        user.setName(signUpRequest.getName());
//        user.setAbout(signUpRequest.getAbout());
//        user.setEmail(signUpRequest.getEmail());
//        user.setRole(Role.USER);
//        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
//        return userRepo.save(user);
//    }

//    public User signup(UserDto userDto){
////        User user = new User();
////        user.setName(userDto.getName());
////        user.setAbout(userDto.getAbout());
////        user.setEmail(userDto.getEmail());
////        user.setRole(Role.USER);
////        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
////        return userRepo.save(user);
//
//        User user = dtoToUser(userDto);
//
//
//        return this.userRepo.save(user);
//    }


   /* @Override
    public UserDto createUser(UserDto userDto) {

        User user = dtoToUser(userDto);
        user.setName(userDto.getName());
        user.setAbout(userDto.getAbout());
        user.setEmail(userDto.getEmail());
//        user.setRoles();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Create a Role object for the USER role
        Optional<Role> role= roleRepo.findById(2);//user
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role.orElse(null));
        user.setRoles(roleSet);


        // Encode the password before setting it
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        // Save the user
        User savedUser = userRepo.save(user);

        // Convert the saved user entity back to DTO and return
        return userToDto(savedUser);

    }*/

//    @Override
//    public UserDto createUser(UserDto userDto) {
//        // Convert DTO to entity
//        User user = dtoToUser(userDto);
//        // Set user attributes
//        user.setFirstName(userDto.getFirstName());
//        user.setLastName(userDto.getLastName());
//        user.setEmail(userDto.getEmail());
//        user.setUserName(userDto.getUserName());
//        user.setContact(userDto.getContact());
//        user.setGender(userDto.getGender());
//        user.setCategory(userDto.getCountry());
//        user.setDob(userDto.getDob());
//        user.setId(userDto.getId());
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
//        // Save the user to the database
//        User savedUser = userRepo.save(user);
//        // Convert the saved user entity back to DTO and return
//        return userToDto(savedUser);
//    }
@Override
public UserDto createUser(UserDto userDto) {
    // Map UserDto to User entity
    User user = modelMapper.map(userDto, User.class);

    // Encode the user's password
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));

    // Save the user entity to the repository
    User savedUser = userRepo.save(user);

    // Map the saved User entity back to UserDto
    UserDto savedUserDto = modelMapper.map(savedUser, UserDto.class);

    return savedUserDto;
}




//    @Override
//    public UserDto createAdmin(UserDto userDto) {
//
//        User user = dtoToUser(userDto);
//        user.setName(userDto.getName());
//        user.setAbout(userDto.getAbout());
//        user.setEmail(userDto.getEmail());
////        user.setRoles();
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
//
//        // Create a Role object for the USER role
//        Optional<Role> role= roleRepo.findById(501);
//        Set<Role> roleSet = new HashSet<>();
//        roleSet.add(role.orElse(null));
//        user.setRoles(roleSet);
//        // Encode the password before setting it
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
//        // Save the user
//        User savedUser = userRepo.save(user);
//
//        // Convert the saved user entity back to DTO and return
//        return userToDto(savedUser);
//
//    }




    public JwtAuthenticationResponse signin(SigninRequest signinRequest) throws Exception {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(signinRequest.getUserName(),
                signinRequest.getPassword());
        try {

            this.authenticationManager.authenticate(authenticationToken);
        }
        catch (BadCredentialsException e)
        {
            System.out.println("Invalid credentials");
            throw  new ApiException("Invalid Username and Password: " + signinRequest);

        }

        var user = userRepo.findByUsername(signinRequest.getUserName()).orElseThrow(()->new IllegalArgumentException("Invalid email or Password.."));
//        System.out.println(user.getAuthorities());
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setUser(this.modelMapper.map((User)user,UserDto.class));


        jwtAuthenticationResponse.setRefreshToken(refreshToken);

        return jwtAuthenticationResponse;
    }

//    public JwtAuthenticationResponse signin(SigninRequest signinRequest){
//        // Find user by email
//        User user = userRepo.findByEmail(signinRequest.getEmail())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
//
//        // Verify password
//        if (!passwordEncoder.matches(signinRequest.getPassword(), user.getPassword())) {
//            throw new IllegalArgumentException("Invalid email or password");
//        }
//
//        // Generate JWT token
//        String jwtToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
//
//        // Convert User to UserDto
//        UserDto userDto = modelMapper.map(user, UserDto.class);
//
//        // Create JwtAuthenticationResponse object with token, email, and password
//        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
//            jwtAuthenticationResponse.setToken(jwtToken);
//        jwtAuthenticationResponse.setRefreshToken(refreshToken);
//        jwtAuthenticationResponse.setEmail(signinRequest.getEmail());
//        jwtAuthenticationResponse.setEmail(signinRequest.g
//        );
//        return jwtAuthenticationResponse;
//    }
//    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepo.findByUsername(userEmail).orElseThrow();
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(),user)){

            var jwt = jwtService.generateToken(user);
//          var refreshToken = refreshTokenRequest.getToken();
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);

            return jwtAuthenticationResponse;

        }
        return null;
    }

    public User dtoToUser(UserDto userDto)
    {
        User user = this.modelMapper.map(userDto,User.class);
//        user.setId(userdto.getId());
//        user.setName(userdto.getName());
//        user.setEmail(userdto.getEmail());
//        user.setAbout(userdto.getAbout());
//        user.setPassword(userdto.getPassword());
        return user;
    }

    public UserDto userToDto(User user) {
        return this.modelMapper.map(user, UserDto.class);
    }



}


