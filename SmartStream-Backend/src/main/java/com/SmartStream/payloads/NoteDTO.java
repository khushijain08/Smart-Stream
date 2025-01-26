package com.SmartStream.payloads;

import lombok.Data;

@Data
public class NoteDTO {
    private Long id;
    private String title;
    private String content;

    private String filePath; // Include file path
    private String fileName; // Include file name
    private String fileType; // Include MIME type

    private int downloadCount; // Track downloads
}
