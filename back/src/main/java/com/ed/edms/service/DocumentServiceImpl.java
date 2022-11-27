package com.ed.edms.service;

import com.ed.edms.entity.Document;
import com.ed.edms.entity.User;
import com.ed.edms.repository.DocumentRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DocumentServiceImpl implements DocumentService {
    private static final String fileDirectory = System.getProperty("user.dir") + "/documents/";
    private final Path root = Paths.get(fileDirectory);
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    CurrentUserInfoService currentUserInfoService = new CurrentUserInfoService();

    public DocumentServiceImpl(UserRepository userRepository, DocumentRepository documentRepository) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
    }

    @Override
    public Resource downloadDocument(String filename, String author) throws MalformedURLException {
        return new UrlResource(root.resolve(author).resolve(filename).toUri());
    }

    private void uploadDocument(MultipartFile file, String fileName) throws IOException {
        Files.createDirectories(Paths.get(fileDirectory +
                currentUserInfoService.getCurrentUsername()));
        Path filePath = Paths.get(fileDirectory +
                currentUserInfoService.getCurrentUsername(), fileName);
        Files.write(filePath, file.getBytes());
//        try (Stream<Path> files = Files.list(Paths.get(fileDirectory +
//                currentUserInfoService.getCurrentUsername()))) {
//            long count = files.count();
//            System.out.println(count);
//        }
//        return "File uploaded " + file.getOriginalFilename();
    }

    @Override
    public User addDocument(MultipartFile file, String fileName) throws IOException {
        Document document = new Document();
        document.setAuthor(currentUserInfoService.getCurrentUsername());
        document.setName(fileName);
        document.setType(file.getContentType());
        document.setSize(file.getSize());
        document.setCreationDate(LocalDateTime.now());
        uploadDocument(file, fileName);
        User user = userRepository
                .findByUsername(currentUserInfoService.getCurrentUsername())
                .get();
        if (user.getDocuments() != null) {
            user.getDocuments().add(document);
        } else {
            Set<Document> documents = new HashSet<>();
            documents.add(document);
            user.setDocuments(documents);
        }
        userRepository.save(user);
//        documentRepository.save(document);
        return user;
    }

    @Override
    public Document deleteOneDocument(Long id) {
        Optional<Document> document = documentRepository.findById(id);
        Optional<User> user = userRepository.findByUsername(document.get().getAuthor());
        User userTemp = user.get();
        if (document.isPresent()) {
                    Set<Document> documents = user.get().getDocuments();
                    documents.remove(document);
                    userTemp.setDocuments(documents);
                    userRepository.save(userTemp);
            return document.get();
        } else {
            return null;
        }
    }

    @Override
    public User sendOneDocument(Long userId, Long documentId) {
        Document document = documentRepository.findById(documentId).get();
        User user = userRepository.findById(userId).get();
        Set <Document> documents = user.getDocuments();
        documents.add(document);
        user.setDocuments(documents);
        return userRepository.save(user);
    }

    @Override
    public Set<Document> getAllUserDocuments() {
        return userRepository
                .findByUsername(currentUserInfoService.getCurrentUsername()).get()
                .getDocuments();
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}
