package com.ed.edms.service;

import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;
import com.ed.edms.repository.PersonRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final CurrentUserInfoService currentUserInfoService;

    public UserServiceImpl(UserRepository userRepository, PersonRepository personRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        currentUserInfoService = new CurrentUserInfoService();
    }

    @Override
    public List<User> getAllWithoutAuth() {
        List<User> users = userRepository.findAll();
        users.remove(userRepository.findByUsername(currentUserInfoService.getCurrentUsername()).get());
        return users;
    }

    @Override
    public Optional<User> getOne(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Person getUserPersonDetails(Long id) {
        Optional<User> user = userRepository.findById(id);
        Person person = new Person();
        if (user.isPresent()) {
            person = user.get().getPerson();
        }
        return person;
    }

    @Override
    public User deleteOneUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        userRepository.deleteById(id);
        return user.get();
    }

    @Override
    public User updateOneUser(Long id, User userToUpdate) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setUsername(userToUpdate.getUsername());
            user.get().setEmail(userToUpdate.getEmail());
            user.get().setRoles(userToUpdate.getRoles());
            user.get().setPassword(passwordEncoder.encode(userToUpdate.getPassword()));
            return userRepository.save(user.get());
        }
        return null;
    }

    @Override
    public User updateUserDetails(Long id, Person person) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            if (user.get().getPerson() == null){
                user.get().setPerson(person);
            } else {
                Person personToUpdate = personRepository.findById(
                        user.get().getPerson().getId()).get();
                personToUpdate.setAddress(person.getAddress());
                personToUpdate.setFirstName(person.getFirstName());
                personToUpdate.setPhoneNumber(personToUpdate.getPhoneNumber());
                personToUpdate.setSecondName(person.getSecondName());
                user.get().setPerson(personToUpdate);
            }
            return userRepository.save(user.get());
        }
        return null;
    }

    @Override
    public User getCurrentUser() {
        return userRepository.findByUsername(currentUserInfoService.getCurrentUsername()).get();
    }
}
