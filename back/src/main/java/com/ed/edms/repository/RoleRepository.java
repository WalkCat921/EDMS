package com.ed.edms.repository;

import com.ed.edms.modal.ERole;
import com.ed.edms.modal.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
