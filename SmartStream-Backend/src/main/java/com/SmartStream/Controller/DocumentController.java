package com.SmartStream.Controller;

import com.SmartStream.Services.DocumentService;
import com.SmartStream.payloads.DocumentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Create a new document
    @PostMapping("/create")
    public ResponseEntity<DocumentDTO> createDocument(@RequestBody DocumentDTO documentDTO, Principal principal) {
        // Pass the username of the logged-in user as the creator
        String createdBy = principal.getName();
        DocumentDTO createdDocument = documentService.createDocument(documentDTO, createdBy);
        return ResponseEntity.ok(createdDocument);
    }

    // Get a document by ID
    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all documents
    @GetMapping("/")
    public ResponseEntity<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // Update a document
    @PutMapping("/{id}")
    public ResponseEntity<DocumentDTO> updateDocument(@PathVariable Long id, @RequestBody DocumentDTO documentDTO, Principal principal) {
        String updatedBy = principal.getName();
        DocumentDTO updatedDocument = documentService.updateDocument(id, documentDTO, updatedBy);

        if (updatedDocument != null) {
            return ResponseEntity.ok(updatedDocument);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a document
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id, Principal principal) {
        String deletedBy = principal.getName();
        documentService.deleteDocument(id, deletedBy);
        return ResponseEntity.noContent().build();
    }
}
