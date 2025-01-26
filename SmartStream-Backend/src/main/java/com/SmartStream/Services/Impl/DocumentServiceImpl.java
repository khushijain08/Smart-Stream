package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.Document;
import com.SmartStream.Repositories.DocumentRepository;
import com.SmartStream.Services.DocumentService;
import com.SmartStream.payloads.DocumentDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Convert Document entity to DocumentDTO
    private DocumentDTO convertToDTO(Document document) {
        return modelMapper.map(document, DocumentDTO.class);
    }

    // Create a new document
    @Override
    public DocumentDTO createDocument(DocumentDTO documentDTO, String createdBy) {
        Document document = modelMapper.map(documentDTO, Document.class);  // Convert DTO to entity
        document.setCreatedDate(LocalDateTime.now());
        document.setCreatedBy(createdBy);

        Document savedDocument = documentRepository.save(document);

        return convertToDTO(savedDocument);  // Convert entity back to DTO
    }

    // Get document by ID
    @Override
    public Optional<DocumentDTO> getDocumentById(Long id) {
        Optional<Document> document = documentRepository.findById(id);
        return document.map(this::convertToDTO);  // Convert entity to DTO
    }

    // Get all documents
    @Override
    public List<DocumentDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return documents.stream().map(this::convertToDTO).collect(Collectors.toList());  // Convert list of entities to list of DTOs
    }

    // Update a document
    @Override
    public DocumentDTO updateDocument(Long id, DocumentDTO documentDTO, String updatedBy) {
        Optional<Document> optionalDocument = documentRepository.findById(id);

        if (optionalDocument.isPresent()) {
            Document document = optionalDocument.get();
            document.setTitle(documentDTO.getTitle());
            document.setBody(documentDTO.getBody());
            document.setCreatedBy(updatedBy);  // This can be an audit field if needed
            document.setCreatedDate(LocalDateTime.now());  // Optional: change the created date or leave it unchanged

            Document updatedDocument = documentRepository.save(document);
            return convertToDTO(updatedDocument);  // Convert entity back to DTO
        } else {
            return null;  // Handle this case as per your business logic
        }
    }

    // Delete a document
    @Override
    public void deleteDocument(Long id, String deletedBy) {
        documentRepository.deleteById(id);  // You may want to mark it as deleted instead of actual deletion
    }
}
