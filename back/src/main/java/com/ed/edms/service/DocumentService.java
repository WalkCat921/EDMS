package com.ed.edms.service;

import com.ed.edms.entity.Document;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Set;

// TODO statistics
// TODO documentService (add, delete) to user
// TODO errorHandling
// TODO pre-auth
// TODO documentSharing

public interface DocumentService {
    Resource downloadDocument(String filename) throws MalformedURLException;

    String uploadDocument(MultipartFile file) throws IOException;

    Document addDocument(MultipartFile file);

    Document deleteOneDocument(Long id);

    Document sendOneDocument(Long userId, Long documentId);

    Set<Document> getAllUserDocuments();

    List<Document> getAllDocuments();
}
