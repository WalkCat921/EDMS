package com.ed.edms.service;

import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;
import com.ed.edms.repository.PersonRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PersonRepository personRepository;

    public UserServiceImpl(UserRepository userRepository, PersonRepository personRepository) {
        this.userRepository = userRepository;
        this.personRepository = personRepository;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
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
            user.get().setPassword(userToUpdate.getPassword());
            return userRepository.save(user.get());
        }
        return null;
    }

    @Override
    public User updateUserDetails(Long id, Person person) {
        Optional<User> user = userRepository.findById(id);
        Date date = new Date();

        if (user.isPresent()) {
            Optional<Person> personTemp =
                    personRepository.findByPhoneNumber(person.getPhoneNumber());
            if (personTemp.isPresent()) {
                user.get().setPerson(personTemp.get());
                user.get().getPerson().setUser(user.get());
            } else {
                user.get().setPerson(person);
            }
            return userRepository.save(user.get());
        }
        return null;
    }
}
