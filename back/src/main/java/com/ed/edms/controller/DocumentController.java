package com.ed.edms.controller;

import com.ed.edms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/doc")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename) throws MalformedURLException {
        return ResponseEntity.ok(documentService.downloadDocument(filename));
    }

    @PutMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(documentService.uploadDocument(file), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDocumentToUser(@RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(documentService.addDocument(file), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDocumentFromUser(@PathVariable Long id){
        return new ResponseEntity<>(documentService.deleteOneDocument(id), HttpStatus.OK);
    }
}
