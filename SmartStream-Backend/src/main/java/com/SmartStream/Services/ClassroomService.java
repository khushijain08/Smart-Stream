package com.SmartStream.Services;

import com.SmartStream.Entities.Classroom;
import com.SmartStream.payloads.ClassroomDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ClassroomService  {

   /* Classroom createClassroom(ClassroomDTO classroomDTO, String username);
    List<Classroom> getAllClassrooms();
    void deleteClassroom(Long id, String username);
    List<Classroom> findByClassname(String classname);
    List<Classroom> findBySubject(String subject);
    List<Classroom> findByRoom(String room);*/

    ClassroomDTO createClassroom(ClassroomDTO classroomDTO, String ownerUsername);
    ClassroomDTO getClassroom(Long id);
    ClassroomDTO joinClassroom(String classCode, String username);
    void deleteClassroom(Long classroomId, String ownerUsername);
    List<ClassroomDTO> getAllClassrooms();
    List<ClassroomDTO> searchClassroomsByName(String className);
    List<ClassroomDTO> searchClassroomsBySubject(String subject);
    List<ClassroomDTO> searchClassroomsByRoom(String room);
    List<ClassroomDTO> searchClassroomsByOwnerUsername(String username);
    public ClassroomDTO getClassroomByClassCode(String classCode);
}
