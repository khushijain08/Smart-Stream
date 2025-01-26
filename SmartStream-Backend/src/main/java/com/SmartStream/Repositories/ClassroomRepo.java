package com.SmartStream.Repositories;

import com.SmartStream.Entities.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClassroomRepo extends JpaRepository<Classroom,Long> {


    Optional<Classroom> findByClassCode(String classCode); // Find classroom by class code
    List<Classroom> findByClassNameContainingIgnoreCase(String className);
    List<Classroom> findBySubjectContainingIgnoreCase(String subject); // Add this method
    List<Classroom> findByRoomContainingIgnoreCase(String room); // Add this method
    @Query("SELECT c FROM Classroom c WHERE c.owner.username LIKE %:username%")
    List<Classroom> findByOwnerUsernameContainingIgnoreCase(String username);


}
