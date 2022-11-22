package com.ed.edms.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/doc")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DocumentController {

    private static final String fileDirectory = System.getProperty("user.dir") + "/documents/";
    private final Path root = Paths.get(fileDirectory);

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename) throws MalformedURLException {
        Resource file = new UrlResource(root.resolve(filename).toUri());
        return ResponseEntity.ok(file);
    }

    @PutMapping( "/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("nameFile")
            String nameFile) throws IOException {
        System.out.println(nameFile);
        Files.createDirectories(Paths.get(fileDirectory));
        Path filePath = Paths.get(fileDirectory, file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
        return new ResponseEntity<>("File uploaded " + file.getOriginalFilename(), HttpStatus.OK);
    }
}
