package com.ed.edms.service;

import com.ed.edms.config.jwt.JwtUtils;
import com.ed.edms.entity.Address;
import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;
import com.ed.edms.pojo.JwtResponse;
import com.ed.edms.repository.PersonRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
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
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public UserServiceImpl(UserRepository userRepository, PersonRepository personRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        currentUserInfoService = new CurrentUserInfoService();
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
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
    public User updateOneUser(User userToUpdate) {
        User user = userRepository.findByUsername(currentUserInfoService.getCurrentUsername()).get();
        if (user.getPerson() == null){
            user.setPerson(new Person());
        }
        if (user.getPerson().getAddress() == null) {
            user.getPerson().setAddress(new Address());
            userRepository.save(user);
        }
        user = userRepository.findById(user.getId()).get();
        user.getPerson().setPhoneNumber(userToUpdate.getPerson().getPhoneNumber());
        user.getPerson().setSecondName(userToUpdate.getPerson().getSecondName());
        user.getPerson().setFirstName(userToUpdate.getPerson().getFirstName());
        user.getPerson().getAddress().setFlatNumber(userToUpdate.getPerson().getAddress().getFlatNumber());
        user.getPerson().getAddress().setHouseNumber(userToUpdate.getPerson().getAddress().getHouseNumber());
        user.getPerson().getAddress().setStreet(userToUpdate.getPerson().getAddress().getStreet());
        user.getPerson().getAddress().setCity(userToUpdate.getPerson().getAddress().getCity());
        user.getPerson().getAddress().setCountry(userToUpdate.getPerson().getAddress().getCountry());
        userRepository.save(user);


        return user;
    }

    @Override
    public User updateUserDetails(Person person) {
        Optional<User> user = userRepository.findByUsername(currentUserInfoService.getCurrentUsername());
        if (user.isPresent()) {
            if (user.get().getPerson() == null) {
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
