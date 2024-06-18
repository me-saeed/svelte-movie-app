<script lang="ts">
  import { onMount } from 'svelte';
  import MovieList from '../components/MovieList.svelte';
  import { fetchMovies } from '../api/movieService';

  let movies: Array<{
    id: number;
    title: string;
    overview: string;
    poster: string;
  }> = [];

  onMount(async () => {
    movies = await fetchMovies();
  });
</script>

<main>
  <h1>Popular Movies</h1>
  <MovieList {movies} />
</main>

<style>
  main {
    padding: 16px;
  }
</style>
