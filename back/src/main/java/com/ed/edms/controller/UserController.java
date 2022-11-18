package com.ed.edms.controller;

import com.ed.edms.modal.User;
import com.ed.edms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        return new ResponseEntity<>(userService.getOne(id), HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody User user){
        return new ResponseEntity<>(userService.updateOne(id, user), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id){
        userService.deleteOne(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/person/{id}")
    public ResponseEntity<?> getUserPersonDetailsById(@PathVariable Long id){
        return new ResponseEntity<>(userService.getUserPersonDetails(id), HttpStatus.OK);
    }

}
