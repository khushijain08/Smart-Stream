package com.SmartStream.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistDTO {

    private Long id;
    private String title;
    private String description;
    private List<String> videos;  // URLs or video IDs

    private String createdBy;  // Username of the user who created the playlist
    private LocalDateTime createdAt;  // Time and date when the playlist was created

    private String updatedBy;  // Username of the user who last updated the playlist
    private LocalDateTime updatedAt;  // Time and date when the playlist was last updated
}
