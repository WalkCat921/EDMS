package com.ed.edms.service;

import com.ed.edms.entity.Document;
import com.ed.edms.entity.User;
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
// TODO delete from local

public interface DocumentService {
    Resource downloadDocument(String filename, String author) throws MalformedURLException;

    User addDocument(MultipartFile file, String fileName) throws IOException;

    Document deleteOneDocument(Long id);

    User sendOneDocument(Long userId, Long documentId);

    Set<Document> getAllUserDocuments();

    List<Document> getAllDocuments();
}
