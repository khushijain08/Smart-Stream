package com.SmartStream.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String className;
    private String section;
    private String subject;
    private String room;

    @Column(unique = true, nullable = false)
    private String classCode; // Randomly generated class code

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private User owner; // Classroom owner

    @ManyToMany(fetch = FetchType.LAZY)

    @JoinTable(
            name = "classroom_users",
            joinColumns = @JoinColumn(name = "classroom_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private Set<User> joinedUsers = new HashSet<>(); // Users who joined

    // Optionally, you can add helper methods to manage the joinedUsers set
    public void addUser(User user) {
        joinedUsers.add(user);
    }

    public void removeUser(User user) {
        joinedUsers.remove(user);
    }
}
