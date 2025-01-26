package com.SmartStream.Services;

import com.SmartStream.Entities.MeetJoin;

import java.util.List;
import java.util.UUID;

public interface MeetService {
    MeetJoin createMeetJoin(String topicName, String createdBy);

    MeetJoin getMeetById(UUID id);

    List<MeetJoin> getAllMeets();

    void deleteMeet(UUID id);

    MeetJoin joinMeetByCode(String meetCode, String username);
}
