package com.ed.edms.service;

import com.ed.edms.modal.Document;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

// TODO statistics
// TODO userFriends
// TODO userDocuments
// TODO documentService (add, delete) to user
// TODO errorHandling
// TODO pre-auth

public interface DocumentService {
    Resource downloadDocument(String filename) throws MalformedURLException;

    String uploadDocument(MultipartFile file) throws IOException;

    Document addDocument(MultipartFile file);

    Document deleteOneDocument(Long id);
}
