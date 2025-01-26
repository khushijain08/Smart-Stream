package com.SmartStream.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ElementCollection
    private List<String> videos;  // Store URLs or video IDs

    private String createdBy;  // Username of the user who created the playlist
    private LocalDateTime createdAt;  // Time and date when the playlist was created

    private String updatedBy;  // Username of the user who last updated the playlist
    private LocalDateTime updatedAt;  // Time and date when the playlist was last updated
}
