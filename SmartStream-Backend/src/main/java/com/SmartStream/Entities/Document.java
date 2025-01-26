package com.SmartStream.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255) // Limiting title length
    private String title;

    @Column(columnDefinition = "TEXT") // Allows storing large content
    private String body;

    private LocalDateTime createdDate;

    @Column(nullable = false)
    private String createdBy; // This field will store the username of the creator

    // Automatically set createdDate before persisting the entity
    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
