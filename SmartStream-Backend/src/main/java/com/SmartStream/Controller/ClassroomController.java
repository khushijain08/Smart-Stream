package com.SmartStream.Controller;

import com.SmartStream.Entities.Classroom;
import com.SmartStream.Services.ClassroomService;
import com.SmartStream.exceptions.ResourceNotFoundException;
import com.SmartStream.payloads.ClassroomDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private ModelMapper modelMapper;

    // Create classroom
    @PostMapping("/create")
    public ResponseEntity<ClassroomDTO> createClassroom(@RequestBody ClassroomDTO classroomDTO, Principal principal) {
        // Get the owner's username from Principal
        String ownerUsername = principal.getName();

        // Create the classroom and retrieve the DTO
        ClassroomDTO createdClassroom = classroomService.createClassroom(classroomDTO, ownerUsername);

        return new ResponseEntity<>(createdClassroom, HttpStatus.CREATED);
    }

    // Get classroom by ID
    @GetMapping("/{id}")
    public ResponseEntity<ClassroomDTO> getClassroom(@PathVariable Long id) {
        ClassroomDTO classroomDTO = classroomService.getClassroom(id);
        return ResponseEntity.ok(classroomDTO);
    }

    // Join a classroom by class code
    @PostMapping("/join/{classCode}")
    public ResponseEntity<ClassroomDTO> joinClassroom(@PathVariable String classCode, Principal principal) {
        // Get the user's username from Principal
        String username = principal.getName();

        // Attempt to join the classroom
        ClassroomDTO joinedClassroom = classroomService.joinClassroom(classCode, username);

        // Check if joining was successful
        if (joinedClassroom == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Optionally return a message
        }

        return ResponseEntity.ok(joinedClassroom);
    }



    // Delete classroom by owner
    @DeleteMapping("/delete/{classroomId}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long classroomId, Principal principal) {
        String ownerUsername = principal.getName();
        classroomService.deleteClassroom(classroomId, ownerUsername);
        return ResponseEntity.noContent().build();
    }

    // Get all classrooms (for the owner or joined users)
    @GetMapping("/my-classrooms")
    public ResponseEntity<List<ClassroomDTO>> getAllClassrooms() {
        List<ClassroomDTO> classrooms = classroomService.getAllClassrooms(); // Update service method
        return ResponseEntity.ok(classrooms);
    }
    @GetMapping("/search/{className}")
    public ResponseEntity<List<ClassroomDTO>> searchClassrooms(@PathVariable String className) {
        List<ClassroomDTO> classrooms = classroomService.searchClassroomsByName(className);
        return ResponseEntity.ok(classrooms);
    }
    @GetMapping("/search/subject/{subject}")
    public ResponseEntity<List<ClassroomDTO>> searchClassroomsBySubject(@PathVariable String subject) {
        List<ClassroomDTO> classrooms = classroomService.searchClassroomsBySubject(subject);
        return ResponseEntity.ok(classrooms);
    }

    @GetMapping("/search/room/{room}")
    public ResponseEntity<List<ClassroomDTO>> searchClassroomsByRoom(@PathVariable String room) {
        List<ClassroomDTO> classrooms = classroomService.searchClassroomsByRoom(room);
        return ResponseEntity.ok(classrooms);
    }
    @GetMapping("/search/owner/{username}")
    public ResponseEntity<List<ClassroomDTO>> searchClassroomsByOwner(@PathVariable String username) {
        List<ClassroomDTO> classrooms = classroomService.searchClassroomsByOwnerUsername(username);
        return ResponseEntity.ok(classrooms);
    }
    @GetMapping("/by-code/{classCode}")
    public ResponseEntity<ClassroomDTO> getClassroomByClassCode(@PathVariable String classCode) {
        try {
            ClassroomDTO classroomDTO = classroomService.getClassroomByClassCode(classCode);
            return ResponseEntity.ok(classroomDTO);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if not found
        }
    }
}
