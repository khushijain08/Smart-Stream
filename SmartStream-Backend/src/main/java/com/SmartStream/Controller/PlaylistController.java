package com.SmartStream.Controller;

import com.SmartStream.Services.PlaylistService;
import com.SmartStream.payloads.PlaylistDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<PlaylistDTO> createPlaylist(@RequestBody PlaylistDTO playlistDTO) {
        PlaylistDTO createdPlaylist = playlistService.createPlaylist(playlistDTO);
        return ResponseEntity.ok(createdPlaylist);
    }
    @PutMapping("/{id}")
    public ResponseEntity<PlaylistDTO> updatePlaylist(@PathVariable Long id, @RequestBody PlaylistDTO playlistDTO) {
        PlaylistDTO updatedPlaylist = playlistService.updatePlaylist(id, playlistDTO);
        return ResponseEntity.ok(updatedPlaylist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.noContent().build();
    }
    // Get all playlists
    @GetMapping
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists() {
        List<PlaylistDTO> playlists = playlistService.getAllPlaylists();
        return ResponseEntity.ok(playlists);
    }

    // Search playlists by title
    @GetMapping("/search/{title}")
    public ResponseEntity<List<PlaylistDTO>> searchPlaylists(@PathVariable String title) {
        List<PlaylistDTO> playlists = playlistService.searchPlaylistsByTitle(title);
        return ResponseEntity.ok(playlists);
    }
    @GetMapping("/search/username/{username}")
    public ResponseEntity<List<PlaylistDTO>> searchPlaylistsByUsername(@PathVariable String username) {
        List<PlaylistDTO> playlists = playlistService.searchPlaylistsByUsername(username);
        return ResponseEntity.ok(playlists);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDTO> getPlaylistById(@PathVariable Long id) {
        PlaylistDTO playlist = playlistService.getPlaylistById(id);
        return ResponseEntity.ok(playlist);
    }
}
