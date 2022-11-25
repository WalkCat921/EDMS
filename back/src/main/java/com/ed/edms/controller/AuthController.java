package com.ed.edms.controller;

import com.ed.edms.pojo.LoginRequest;
import com.ed.edms.pojo.SignUpRequest;
import com.ed.edms.service.AuthorizationService;
import com.ed.edms.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    private final AuthorizationService authorizationService;
    private final RegistrationService registrationService;

    public AuthController(AuthorizationService authorizationService, RegistrationService registrationService) {
        this.authorizationService = authorizationService;
        this.registrationService = registrationService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authorizationService.authorization(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signupRequest) {
        return registrationService.registration(signupRequest);
    }
}
