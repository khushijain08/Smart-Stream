package com.SmartStream.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class MeetJoin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id; // UUID as ID type

    @Column(nullable = false)
    private String topicName;

    @Column(nullable = false, unique = true)
    private String meetCode;

    @Column(nullable = false)
    private String createdBy; // username of the creator

    // Constructor with parameters
    public MeetJoin(String topicName, String meetCode, String createdBy) {
        this.topicName = topicName;
        this.meetCode = meetCode;
        this.createdBy = createdBy;
    }
}
