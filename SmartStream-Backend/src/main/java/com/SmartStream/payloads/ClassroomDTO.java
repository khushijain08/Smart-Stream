package com.SmartStream.payloads;

import lombok.Data;

import java.util.Set;

@Data
public class ClassroomDTO {

        private Long id;
        private String className;
        private String section;
        private String subject;
        private String room;
        private String classCode; // Randomly generated class code
        private String ownerUsername; // To show who the owner is
    }


