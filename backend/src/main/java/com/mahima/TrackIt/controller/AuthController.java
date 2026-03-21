package com.mahima.TrackIt.controller;

import com.mahima.TrackIt.dto.LoginRequest;
import com.mahima.TrackIt.model.User;
import com.mahima.TrackIt.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") // ✅ allow frontend
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

    // LOGIN API (UPDATED ✅)
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        // ❌ DO NOT SEND PASSWORD
        user.setPassword(null);

        return user;
    }
}