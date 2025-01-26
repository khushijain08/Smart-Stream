package com.SmartStream.Services;

import com.SmartStream.Entities.Note;
import com.SmartStream.payloads.NoteDTO;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public interface NoteService {
    NoteDTO uploadNoteWithDetails(MultipartFile file, String classroomName, String token, String title, String content) throws IOException;


    void deleteNoteByTitle(String title, String username);

    List<NoteDTO> getAllNotes();

    List<NoteDTO> getAllNotesByClassroomName(String classroomName);
    NoteDTO downloadNoteByTitle(String title);

}
