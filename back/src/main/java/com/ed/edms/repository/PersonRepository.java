package com.ed.edms.repository;

import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByPhoneNumber(String phoneNumber);
    Optional<Person> findByUser(User user);
}
