package com.SmartStream.Services;

import com.SmartStream.Entities.Playlist;
import com.SmartStream.payloads.PlaylistDTO;

import java.util.List;

public interface PlaylistService {
    PlaylistDTO createPlaylist(PlaylistDTO playlistDTO);

    PlaylistDTO updatePlaylist(Long id, PlaylistDTO playlistDTO);

    void deletePlaylist(Long id);

    List<PlaylistDTO> searchPlaylistsByTitle(String title);

    List<PlaylistDTO> searchPlaylistsByUsername(String username);
    PlaylistDTO getPlaylistById(Long id);
    List<PlaylistDTO> getAllPlaylists();


}
