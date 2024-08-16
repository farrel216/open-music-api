const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapAlbumDBToModel = (albums, songs) => ({
  id: albums.id,
  name: albums.name,
  year: albums.year,
  songs: songs.map((song) => ({
    id: song.id,
    title: song.title,
    performer: song.performer,
  })),
});

const mapPlaylistSongDBToModel = (playlist, songs) => ({
  playlist: {
    id: playlist.id,
    name: playlist.name,
    username: playlist.username,
    songs: songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    })),
  },
});

const mapPlaylistActivityDBToModel = (playlistId, activities) => ({
  playlistId,
  activities: activities.map((activity) => ({
    username: activity.username,
    title: activity.title,
    action: activity.action,
    time: activity.time,
  })),
});

module.exports = {
  mapDBToModel,
  mapAlbumDBToModel,
  mapPlaylistSongDBToModel,
  mapPlaylistActivityDBToModel,
};
