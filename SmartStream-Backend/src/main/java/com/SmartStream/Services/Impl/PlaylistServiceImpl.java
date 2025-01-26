package com.SmartStream.Services.Impl;

import com.SmartStream.Entities.Playlist;
import com.SmartStream.Repositories.PlaylistRepository;
import com.SmartStream.Services.PlaylistService;
import com.SmartStream.payloads.PlaylistDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private ModelMapper modelMapper;


    // Create a new playlist (only for the logged-in user)
    @Override
    public PlaylistDTO createPlaylist(PlaylistDTO playlistDTO) {
        Playlist playlist = modelMapper.map(playlistDTO, Playlist.class);

        // Get the current logged-in user's username
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Set created details
        playlist.setCreatedBy(username);
        playlist.setCreatedAt(LocalDateTime.now());
        playlist.setUpdatedAt(LocalDateTime.now());
        playlist.setUpdatedBy(username);
        Playlist savedPlaylist = playlistRepository.save(playlist);
        return modelMapper.map(savedPlaylist, PlaylistDTO.class);
    }

    // Update a playlist or add videos (only for the logged-in user who created the playlist)
    @Override
    public PlaylistDTO updatePlaylist(Long id, PlaylistDTO playlistDTO) {
        Optional<Playlist> optionalPlaylist = playlistRepository.findById(id);

        if (optionalPlaylist.isPresent()) {
            Playlist existingPlaylist = optionalPlaylist.get();

            // Get the current logged-in user's username
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            // Check if the logged-in user is the creator of the playlist
            if (!existingPlaylist.getCreatedBy().equals(username)) {
                throw new RuntimeException("You do not have permission to update this playlist.");
            }

            // Update playlist title and description if provided
            existingPlaylist.setTitle(playlistDTO.getTitle());
            existingPlaylist.setDescription(playlistDTO.getDescription());

            // Add new videos to the existing video list
            if (playlistDTO.getVideos() != null && !playlistDTO.getVideos().isEmpty()) {
                existingPlaylist.getVideos().addAll(playlistDTO.getVideos());
            }

            // Set updated details
            existingPlaylist.setUpdatedBy(username);
            existingPlaylist.setUpdatedAt(LocalDateTime.now());

            Playlist updatedPlaylist = playlistRepository.save(existingPlaylist);
            return modelMapper.map(updatedPlaylist, PlaylistDTO.class);
        } else {
            throw new RuntimeException("Playlist not found with id: " + id);
        }
    }

    // Delete a playlist (only for the logged-in user who created the playlist)
    @Override
    public void deletePlaylist(Long id) {
        Optional<Playlist> optionalPlaylist = playlistRepository.findById(id);

        if (optionalPlaylist.isPresent()) {
            Playlist playlist = optionalPlaylist.get();

            // Get the current logged-in user's username
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            // Only allow delete if the logged-in user is the creator
            if (playlist.getCreatedBy().equals(username)) {
                playlistRepository.deleteById(id);
            } else {
                throw new RuntimeException("You do not have permission to delete this playlist.");
            }
        } else {
            throw new RuntimeException("Playlist not found with id: " + id);
        }
    }
    @Override
    public List<PlaylistDTO> getAllPlaylists() {
        // Using ModelMapper to convert each Playlist entity to PlaylistDTO
        return playlistRepository.findAll().stream()
                .map(playlist -> modelMapper.map(playlist, PlaylistDTO.class))
                .collect(Collectors.toList());
    }
    // Search playlists by title
    @Override
    public List<PlaylistDTO> searchPlaylistsByTitle(String title) {
        List<Playlist> playlists = playlistRepository.findByTitleContainingIgnoreCase(title);
        return playlists.stream()
                .map(playlist -> modelMapper.map(playlist, PlaylistDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<PlaylistDTO> searchPlaylistsByUsername(String username) {
        List<Playlist> playlists = playlistRepository.findByCreatedBy(username);
        return playlists.stream()
                .map(playlist -> modelMapper.map(playlist, PlaylistDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public PlaylistDTO getPlaylistById(Long id) {
        Optional<Playlist> playlistOptional = playlistRepository.findById(id);

        if (playlistOptional.isPresent()) {
            Playlist playlist = playlistOptional.get();
            return modelMapper.map(playlist, PlaylistDTO.class);
        } else {
            throw new RuntimeException("Playlist not found with id: " + id);
        }
    }
}




