package com.ed.edms.controller;

import com.ed.edms.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/download/{author}/{filename:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename, @PathVariable String author) throws MalformedURLException {
        return ResponseEntity.ok(documentService.downloadDocument(filename, author));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDocumentToUser(@RequestParam("file") MultipartFile file,
                                               @RequestParam("fileName") String fileName) throws IOException {
        return new ResponseEntity<>(documentService.addDocument(file, fileName), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDocumentFromUser(@PathVariable Long id) {
        return new ResponseEntity<>(documentService.deleteOneDocument(id), HttpStatus.OK);
    }

    @GetMapping("/mydocs")
    public ResponseEntity<?> getAllUserDocuments() {
        return new ResponseEntity<>(documentService.getAllUserDocuments(), HttpStatus.OK);
    }

    @PostMapping("/send/{id}/{documentID}")
    public ResponseEntity<?> sendDocumentToUser(@PathVariable Long id, @PathVariable Long documentID) {
        return new ResponseEntity<>(documentService.sendOneDocument(id, documentID), HttpStatus.OK);
    }

    @GetMapping("/all/docs")
    public ResponseEntity<?> getAllDocuments() {
        return new ResponseEntity<>(documentService.getAllDocuments(), HttpStatus.OK);
    }
}
