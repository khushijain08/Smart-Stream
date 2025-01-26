package com.SmartStream.Controller;

import com.SmartStream.payloads.NoteDTO;
import com.SmartStream.Services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    // Endpoint to upload a note
    @PostMapping("/upload")
    public ResponseEntity<NoteDTO> uploadNote(
            @RequestParam("file") MultipartFile file,
            @RequestParam("classroomName") String classroomName,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            Principal principal) throws IOException {

        // Get the username of the logged-in user from Principal
        String username = principal.getName();

        // Call the service to upload the note with the provided data
        NoteDTO noteDTO = noteService.uploadNoteWithDetails(file, classroomName, username, title, content);

        return ResponseEntity.ok(noteDTO); // Return the uploaded note details
    }

    // Endpoint to delete a note
    @DeleteMapping("/delete/title/{title}")
    public ResponseEntity<Void> deleteNoteByTitle(
            @PathVariable String title,
            Principal principal) {

        // Get the username of the logged-in user from Principal and delete the note by title
        noteService.deleteNoteByTitle(title, principal.getName());
        return ResponseEntity.noContent().build();
    }


    // Endpoint to get all notes for a classroom
    @GetMapping("/classroom/name/{classroomName}")
    public ResponseEntity<List<NoteDTO>> getAllNotesByClassroomName(@PathVariable String classroomName) {
        List<NoteDTO> notes = noteService.getAllNotesByClassroomName(classroomName);
        return ResponseEntity.ok(notes);
    }

    // Endpoint to download a note (increment download count)
    @GetMapping("/download/{title}")
    public ResponseEntity<byte[]> downloadNoteByTitle(@PathVariable String title) throws IOException {
        // Assuming the file is stored in a directory
        Path filePath = Paths.get("path/to/notes/" + title);
        byte[] fileBytes = Files.readAllBytes(filePath);

        // Set headers for file download
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.attachment().filename(title).build());
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
    }

    // Endpoint to get all notes
    @GetMapping("/")
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

}
