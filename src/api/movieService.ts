const API_KEY = "e53e973fa251d9db67c6b9504e116a35";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster: string;
}

interface MovieDetails {
  title: string;
  overview: string;
  poster: string;
  release_date: string;
  runtime: number;
  genres: string;
}

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  const data = await response.json();

  console.log("------it call------");
  console.log("------------", data);
  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return {
    title: data.title,
    overview: data.overview,
    poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    release_date: data.release_date,
    runtime: data.runtime,
    genres: data.genres.map((genre: any) => genre.name).join(", "),
  };
}
