package com.SmartStream.Repositories;

import com.SmartStream.Entities.MeetJoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MeetRepo extends JpaRepository<MeetJoin, UUID> {
    MeetJoin findByMeetCode(String meetCode);
}
