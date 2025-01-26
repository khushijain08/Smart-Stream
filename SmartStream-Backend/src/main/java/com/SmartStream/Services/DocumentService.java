package com.SmartStream.Services;

import com.SmartStream.payloads.DocumentDTO;

import java.util.List;
import java.util.Optional;

public interface DocumentService {
    DocumentDTO createDocument(DocumentDTO documentDTO, String createdBy);
    Optional<DocumentDTO> getDocumentById(Long id);
    List<DocumentDTO> getAllDocuments();
    DocumentDTO updateDocument(Long id, DocumentDTO documentDTO, String updatedBy);
    void deleteDocument(Long id, String deletedBy);
}
