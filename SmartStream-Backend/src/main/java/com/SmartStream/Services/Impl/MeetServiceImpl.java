package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.MeetJoin;
import com.SmartStream.Repositories.MeetRepo;
import com.SmartStream.Services.MeetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MeetServiceImpl implements MeetService {
    @Autowired
    private MeetRepo meetJoinRepository;

    @Override
    public MeetJoin createMeetJoin(String topicName, String createdBy) {
        // Generate a unique meetCode
        String meetCode = UUID.randomUUID().toString();

        // Create a new MeetJoin object
        MeetJoin meetJoin = new MeetJoin(topicName, meetCode, createdBy);

        // Save the meetJoin object to the database
        return meetJoinRepository.save(meetJoin);
    }

    @Override
    public MeetJoin getMeetById(UUID id) {
        // Retrieve the MeetJoin object by its ID
        return meetJoinRepository.findById(id).orElse(null); // Ensure UUID is passed here
    }

    @Override
    public List<MeetJoin> getAllMeets() {
        // Retrieve all meetJoin records from the database
        return meetJoinRepository.findAll();
    }

    @Override
    public void deleteMeet(UUID id) {
        // Delete the MeetJoin object by its ID
        meetJoinRepository.deleteById(id);
    }

    @Override
    public MeetJoin joinMeetByCode(String meetCode, String username) {
        // Find the MeetJoin object by its meetCode
        MeetJoin meetJoin = meetJoinRepository.findByMeetCode(meetCode);

        if (meetJoin != null) {
            // You can perform additional logic here if needed, such as checking if the user can join
            // Return the found meetJoin object
            return meetJoin;
        }
        return null; // If no meeting is found by the code
    }
}
