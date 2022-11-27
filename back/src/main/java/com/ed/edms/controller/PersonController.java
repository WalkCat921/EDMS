package com.ed.edms.controller;

import com.ed.edms.entity.Person;
import com.ed.edms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/person")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class PersonController {
    private final UserService userService;

    public PersonController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonalData(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserPersonDetails(id), HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody Person person) {
        return new ResponseEntity<>(userService.updateUserDetails(id, person), HttpStatus.OK);
    }
}
