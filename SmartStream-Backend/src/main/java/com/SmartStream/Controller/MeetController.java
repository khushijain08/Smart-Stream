package com.SmartStream.Controller;

import com.SmartStream.Entities.MeetJoin;
import com.SmartStream.Services.MeetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/meet")
public class MeetController {
    @Autowired
    private MeetService meetService;

    // Create a new meet
    @PostMapping("/create")
    public ResponseEntity<MeetJoin> createMeetJoin(@RequestBody String topicName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the logged-in user's username
        MeetJoin meet = meetService.createMeetJoin(topicName, username);
        return ResponseEntity.ok(meet);
    }

    // Get a meet by UUID
    @GetMapping("/{id}")
    public ResponseEntity<MeetJoin> getMeetById(@PathVariable("id") UUID id) {
        MeetJoin meetJoin = meetService.getMeetById(id);
        return ResponseEntity.ok(meetJoin);
    }

    // Get all meets
    @GetMapping
    public ResponseEntity<List<MeetJoin>> getAllMeets() {
        List<MeetJoin> meetList = meetService.getAllMeets();
        return ResponseEntity.ok(meetList);
    }

    // Delete a meet by UUID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeet(@PathVariable("id") UUID id) {
        meetService.deleteMeet(id);
        return ResponseEntity.ok("Meet with ID " + id + " has been deleted successfully.");
    }

    // Join a meet by code
    @PostMapping("/join/{code}")
    public ResponseEntity<MeetJoin> joinMeet(@PathVariable("code") String meetCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the logged-in user's username
        MeetJoin meet = meetService.joinMeetByCode(meetCode, username);
        return ResponseEntity.ok(meet);
    }
}