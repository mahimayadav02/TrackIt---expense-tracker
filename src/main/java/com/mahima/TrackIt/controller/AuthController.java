package com.mahima.TrackIt.controller;

import com.mahima.TrackIt.dto.LoginRequest;
import com.mahima.TrackIt.model.User;
import com.mahima.TrackIt.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // REGISTER API
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.loginUser(request.getEmail(), request.getPassword());
    }
}
