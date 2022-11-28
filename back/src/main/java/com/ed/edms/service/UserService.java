package com.ed.edms.service;


import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllWithoutAuth();

    Optional<User> getOne(Long id);

    Person getUserPersonDetails(Long id);

    User deleteOneUser(Long id);

    User updateOneUser(User user);

    User updateUserDetails(Person person);

    User getCurrentUser();
}
