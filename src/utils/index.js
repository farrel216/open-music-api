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

module.exports = { mapDBToModel, mapAlbumDBToModel };
