const adaptToClientFilm = (film) => {
  const adaptedFilm = Object.assign(
    {},
    film,
    {
      posterImage: film.poster_image,
      previewImage: film.preview_image,
      backgroundImage: film.background_image,
      backgroundColor: film.background_color,
      videoLink: film.video_link,
      previewVideoLink: film.preview_video_link,
      scoresCount: film.scores_count,
      runTime: film.run_time,
      isFavorite: film.is_favorite,
    },
  );

  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.is_favorite;

  return adaptedFilm;
};

const adaptToClientUser = (user) => {

  const adaptedUser = Object.assign(
    {},
    user,
    {
      avatar: user.avatar_url,
    },
  );

  delete adaptedUser.avatar_url;
  return adaptedUser;
};

const adaptToClientComment = (comment) => {

  const adaptedComment = Object.assign(
    {},
    comment,
    {
      userId: comment.user.id,
      userName: comment.user.name,
    },
  );

  delete adaptedComment.user;

  return adaptedComment;
};

export {adaptToClientFilm, adaptToClientUser, adaptToClientComment};
