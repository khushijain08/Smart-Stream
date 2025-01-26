package com.SmartStream.Repositories;

import com.SmartStream.Entities.Classroom;
import com.SmartStream.Entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note,Long> {
    List<Note> findAll(); // Method to retrieve all notes
    Optional<Note> findByTitle(String title);

    List<Note> findByClassroom(Classroom classroom);

    List<Note> findByClassroomIn(List<Classroom> classrooms);


}
