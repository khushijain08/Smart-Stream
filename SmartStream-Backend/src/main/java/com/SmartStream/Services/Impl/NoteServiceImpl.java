package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.Classroom;
import com.SmartStream.Entities.Note;
import com.SmartStream.Entities.User;
import com.SmartStream.Repositories.ClassroomRepo;
import com.SmartStream.Repositories.NoteRepository;
import com.SmartStream.Repositories.UserRepo;
import com.SmartStream.Services.NoteService;
import com.SmartStream.exceptions.ResourceNotFoundException;
import com.SmartStream.payloads.NoteDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private ClassroomRepo classroomRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.image}") // The base path for storing uploaded images/files
    private String basePath;

    @Override
    public NoteDTO uploadNoteWithDetails(MultipartFile file, String classroomName, String username, String title, String content) throws IOException {
        // Find the classroom and user by their names
        List<Classroom> classrooms = classroomRepository.findByClassNameContainingIgnoreCase(classroomName);
        Optional<User> userOpt = userRepository.findByUsername(username);

        // Validate if the classroom and user exist
        if (classrooms.isEmpty()) {
            throw new ResourceNotFoundException("Classroom", "name", classroomName); // Custom exception for not found classroom
        }

        if (userOpt.isEmpty()) {
            throw new ResourceNotFoundException("User", "username", username); // Custom exception for not found user
        }

        Classroom classroom = classrooms.get(0); // Retrieve the first classroom
        User author = userOpt.get();

        // Check if the user is the owner of the classroom
        if (!classroom.getOwner().equals(author)) {
            throw new RuntimeException("Only the classroom owner can upload files");
        }

        // Ensure the base directory exists for file storage
        File baseDir = new File(basePath);
        if (!baseDir.exists()) {
            baseDir.mkdirs(); // Create directories if they don't exist
        }

        // Validate and generate a unique file name
        if (file.isEmpty()) {
            throw new RuntimeException("No file uploaded");
        }

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new RuntimeException("Invalid file name");
        }

        // Generate a unique file name using UUID
        String uniqueFileName = UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf("."));
        Path filePath = Paths.get(basePath, uniqueFileName);

        // Copy the uploaded file to the designated path
        Files.copy(file.getInputStream(), filePath);

        // Determine the MIME type of the file (file type)
        String fileType = Files.probeContentType(filePath);

        // Create a new Note entity
        Note note = new Note();
        note.setTitle(title);
        note.setContent(content); // Set the content
        note.setClassroom(classroom);
        note.setUploadedBy(author);
        note.setFilePath(filePath.toString()); // Save the file path (relative or absolute path)
        note.setFileName(uniqueFileName); // Store the file name in the entity
        note.setFileType(fileType); // Store the MIME type in the entity
        note.setDownloadCount(0); // Initialize the download count

        // Save the note entity to the database
        Note savedNote = noteRepository.save(note);

        // Convert saved Note to NoteDTO and return
        return modelMapper.map(savedNote, NoteDTO.class);
    }


    @Override
    public void deleteNoteByTitle(String title, String username) {
        // Find the note by title
        Optional<Note> noteOpt = noteRepository.findByTitle(title);
        if (noteOpt.isEmpty()) {
            throw new RuntimeException("Note not found with title: " + title);
        }

        Note note = noteOpt.get();

        // Check if the user is the owner of the note
        if (!note.getUploadedBy().getUsername().equals(username)) {
            throw new RuntimeException("Only the note owner can delete it");
        }

        // Delete the note
        noteRepository.delete(note);
    }

    @Override
    public List<NoteDTO> getAllNotes() {
        List<Note> notes = noteRepository.findAll(); // Fetch all notes from the repository

        // Convert the list of Note to a list of NoteDTO
        return notes.stream()
                .map(note -> modelMapper.map(note, NoteDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public NoteDTO downloadNoteByTitle(String title) {
        Optional<Note> noteOptional = noteRepository.findByTitle(title);

        // Handle case where note is not found
        if (noteOptional.isEmpty()) {
            throw new ResourceNotFoundException("Note", "title", title);
        }

        Note note = noteOptional.get();

        // Map Note to NoteDTO
        NoteDTO noteDTO = new NoteDTO();
        noteDTO.setId(note.getId());
        noteDTO.setTitle(note.getTitle());
        noteDTO.setContent(note.getContent());
        noteDTO.setFilePath(note.getFilePath());
        noteDTO.setDownloadCount(note.getDownloadCount());

        // Increment download count
        note.setDownloadCount(note.getDownloadCount() + 1);
        noteRepository.save(note);

        return noteDTO;
    }

    @Override
    public List<NoteDTO> getAllNotesByClassroomName(String classroomName) {
        // Find the classrooms by name (list of classrooms)
        List<Classroom> classrooms = classroomRepository.findByClassNameContainingIgnoreCase(classroomName);

        // Check if any classrooms were found
        if (classrooms.isEmpty()) {
            throw new RuntimeException("No classrooms found with the name: " + classroomName);
        }

        // Retrieve notes associated with the found classrooms
        List<Note> notes = noteRepository.findByClassroomIn(classrooms); // Assuming you have this method in your repository

        // Convert the list of Note to a list of NoteDTO
        return notes.stream()
                .map(note -> modelMapper.map(note, NoteDTO.class))
                .collect(Collectors.toList());
    }
}