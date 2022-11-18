package com.ed.edms.service;


import com.ed.edms.modal.Person;
import com.ed.edms.modal.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAll();
    Optional<User> getOne(Long id);
    Person getUserPersonDetails(Long id);
    void deleteOne(Long id);
    User updateOne(Long id, User user);
}
