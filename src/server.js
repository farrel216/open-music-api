const Hapi = require("@hapi/hapi");
const ClientError = require("./exceptions/ClientError");
const AlbumService = require("./services/postgres/AlbumService");
const AlbumValidator = require("./validator/albums");
const albums = require("./api/albums");
const SongService = require("./services/postgres/SongService");
const SongValidator = require("./validator/songs");
const songs = require("./api/songs");
require("dotenv").config();

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: albums,
    options: {
      service: albumService,
      validator: AlbumValidator,
    },
  });
  await server.register({
    plugin: songs,
    options: {
      service: songService,
      validator: SongValidator,
    },
  });
  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      console.log(response);
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
