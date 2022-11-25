package com.ed.edms.service;

import com.ed.edms.entity.Document;
import com.ed.edms.repository.DocumentRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

@Service
public class DocumentServiceImpl implements DocumentService {
    private static final String fileDirectory = System.getProperty("user.dir") + "/documents/";
    private final Path root = Paths.get(fileDirectory);
    CurrentUserInfoService currentUserInfoService = new CurrentUserInfoService();

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(UserRepository userRepository, DocumentRepository documentRepository) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
    }

    @Override
    public Resource downloadDocument(String filename) throws MalformedURLException {
        return new UrlResource(root.resolve(filename).toUri());
    }

    @Override
    public String uploadDocument(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(fileDirectory +
                currentUserInfoService.getCurrentUsername()));
        Path filePath = Paths.get(fileDirectory +
                currentUserInfoService.getCurrentUsername(), file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
        try (Stream<Path> files = Files.list(Paths.get(fileDirectory +
                currentUserInfoService.getCurrentUsername()))) {
            long count = files.count();
            System.out.println(count);
        }
        return "File uploaded " + file.getOriginalFilename();
    }

    @Override
    public Document addDocument(MultipartFile file) {
        Document document = new Document();
        document.setName(file.getName());
        document.setType(file.getContentType());
        document.setSize(file.getSize());
        document.setCreationDate(LocalDateTime.now());
        document.setFullFilePath(file.getOriginalFilename());
//        Optional<User> user =
//                userRepository.findByUsername(currentUserInfoService.getCurrentUsername());
//        user.get().getDocuments().add(document);
//        userRepository.save(user.get());
        documentRepository.save(document);
        return document;
    }

    @Override
    public Document deleteOneDocument(Long id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            documentRepository.deleteById(id);
            return document.get();
        } else {
            return null;
        }
    }

    @Override
    public Document sendOneDocument(Long userId, Long documentId) {
        Document document = documentRepository.findById(documentId).get();
        document.getUsers()
                .add(userRepository.
                        findByUsername(currentUserInfoService
                                .getCurrentUsername()).get());
        return documentRepository.save(document);

//        Optional<User> user = userRepository.findById(id);
//        if (user.isPresent()) {
//            currentUserInfoService.getCurrentUsername();
//        }
    }

    @Override
    public Set<Document> getAllUserDocuments() {
        return userRepository.findByUsername(currentUserInfoService
                .getCurrentUsername()).get().getDocuments();
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}
