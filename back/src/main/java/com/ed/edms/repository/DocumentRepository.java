package com.ed.edms.repository;

import com.ed.edms.modal.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findById(Long id);

    Optional<Document> findByName(String name);
}
