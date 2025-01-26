package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.Classroom;
import com.SmartStream.Entities.User;
import com.SmartStream.Repositories.ClassroomRepo;
import com.SmartStream.Repositories.UserRepo;
import com.SmartStream.Services.ClassroomService;
import com.SmartStream.payloads.ClassroomDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private ClassroomRepo classroomRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Create classroom
    @Override
    public ClassroomDTO createClassroom(ClassroomDTO classroomDTO, String ownerUsername) {
        User owner = userRepository.findByUsername(ownerUsername)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Classroom classroom = modelMapper.map(classroomDTO, Classroom.class);
        classroom.setOwner(owner);
        classroom.setClassCode(generateRandomClassCode());

        Classroom savedClassroom = classroomRepository.save(classroom);
        return modelMapper.map(savedClassroom, ClassroomDTO.class);
    }

    // Get classroom by ID
    @Override
    public ClassroomDTO getClassroom(Long id) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));
        return modelMapper.map(classroom, ClassroomDTO.class);
    }

    // Join classroom by class code
    @Override
    public ClassroomDTO joinClassroom(String classCode, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Classroom classroom = classroomRepository.findByClassCode(classCode)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        classroom.getJoinedUsers().add(user);
        classroomRepository.save(classroom);

        return modelMapper.map(classroom, ClassroomDTO.class);
    }

    // Delete classroom by owner
    @Override
    public void deleteClassroom(Long classroomId, String ownerUsername) {
        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        if (!classroom.getOwner().getUsername().equals(ownerUsername)) {
            throw new RuntimeException("Only the owner can delete the classroom");
        }

        classroomRepository.delete(classroom);
    }

    // Get all classrooms for the owner and joined users
    @Override
    public List<ClassroomDTO> getAllClassrooms() {
        List<Classroom> classrooms = classroomRepository.findAll(); // Fetch all classrooms
        return classrooms.stream()
                .map(classroom -> modelMapper.map(classroom, ClassroomDTO.class)) // Convert to DTO
                .collect(Collectors.toList());
    }
    @Override
    public List<ClassroomDTO> searchClassroomsByName(String className) {
        List<Classroom> classrooms = classroomRepository.findByClassNameContainingIgnoreCase(className);
        return classrooms.stream()
                .map(classroom -> modelMapper.map(classroom, ClassroomDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ClassroomDTO> searchClassroomsBySubject(String subject) {
        List<Classroom> classrooms = classroomRepository.findBySubjectContainingIgnoreCase(subject);
        return classrooms.stream()
                .map(classroom -> modelMapper.map(classroom, ClassroomDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ClassroomDTO> searchClassroomsByRoom(String room) {
        List<Classroom> classrooms = classroomRepository.findByRoomContainingIgnoreCase(room);
        return classrooms.stream()
                .map(classroom -> modelMapper.map(classroom, ClassroomDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ClassroomDTO> searchClassroomsByOwnerUsername(String username) {
        List<Classroom> classrooms = classroomRepository.findByOwnerUsernameContainingIgnoreCase(username);
        return classrooms.stream()
                .map(classroom -> modelMapper.map(classroom, ClassroomDTO.class))
                .collect(Collectors.toList());
    }
    // Method to get classroom by class code
    @Override
    public ClassroomDTO getClassroomByClassCode(String classCode) {
        Optional<Classroom> classroom = classroomRepository.findByClassCode(classCode);

        if (classroom.isEmpty()) {
            return null; // or throw an exception, depending on your design
        }

        return modelMapper.map(classroom.get(), ClassroomDTO.class);
    }
    // Utility method to generate a random class code
    private String generateRandomClassCode() {
        return UUID.randomUUID().toString().substring(0, 8); // Example: random 8-character code
    }
}