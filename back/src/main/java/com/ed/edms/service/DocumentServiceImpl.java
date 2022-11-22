package com.ed.edms.service;

import com.ed.edms.modal.Document;
import com.ed.edms.modal.User;
import com.ed.edms.repository.DocumentRepository;
import com.ed.edms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class DocumentServiceImpl implements DocumentService {
    private static final String fileDirectory = System.getProperty("user.dir") + "/documents/";
    private final Path root = Paths.get(fileDirectory);
    @Autowired
    DocumentRepository documentRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Resource downloadDocument(String filename) throws MalformedURLException {
        return new UrlResource(root.resolve(filename).toUri());
    }

    @Override
    public String uploadDocument(MultipartFile file) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Files.createDirectories(Paths.get(fileDirectory + userDetails.getUsername()));
        Path filePath = Paths.get(fileDirectory + userDetails.getUsername(), file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
        try (Stream<Path> files = Files.list(Paths.get(fileDirectory + userDetails.getUsername()))) {
            long count = files.count();
            System.out.println(count);
        }
        return "File uploaded " + file.getOriginalFilename();
    }

    @Override
    public Document addDocument(MultipartFile file) {
        Document document = new Document();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        document.setName(file.getName());
        document.setType(file.getContentType());
        document.setSize(file.getSize());
        document.setCreationDate(LocalDateTime.now());
        document.setFilepath(file.getOriginalFilename());
        Optional<User> user = userRepository.findByUsername(userDetails.getUsername());
        user.get().getDocuments().add(document);
        userRepository.save(user.get());
//        documentRepository.save(document);
        return null;
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
}
