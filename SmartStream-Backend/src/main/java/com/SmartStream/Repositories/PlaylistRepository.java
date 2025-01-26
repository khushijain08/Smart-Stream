package com.SmartStream.Repositories;

import com.SmartStream.Entities.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist,Long> {
    List<Playlist> findByTitleContainingIgnoreCase(String title);
    List<Playlist> findByCreatedBy(String username);

}
