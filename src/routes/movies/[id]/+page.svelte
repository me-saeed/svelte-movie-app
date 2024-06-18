<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchMovieDetails } from '../../../api/movieService';
  import { goto } from '$app/navigation';
 import { page } from '$app/stores';
  let movie = {
    title: '',
    overview: '',
    poster: '',
    release_date: '',
    runtime: 0,
    genres: ''
  };

  let id: number;


  onMount(async () => {
    id = parseInt($page.params.id);

    if (isNaN(id)) {
      console.error('Invalid movie ID:', $page.params.id);
      return; 
    }

    try {
      movie = await fetchMovieDetails(id);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      
    }
  });

  function navigateToMovieList() {
    goto('/'); 
  }
</script>

<main>
  {#if movie.title}
    <div class="movie-detail">
      <img src={movie.poster} alt={movie.title} />
      <div class="movie-info">
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
        <p><strong>Genres:</strong> {movie.genres}</p>
        <p>{movie.overview}</p>
        <button class="back-btn" on:click={navigateToMovieList}>Back to Movie List</button>
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  .movie-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .movie-detail img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .movie-info {
    text-align: left;
    width: 100%;
    max-width: 600px;
  }

  .movie-info h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }

  .movie-info p {
    margin-bottom: 8px;
    line-height: 1.4;
    color: #666;
  }

  .back-btn {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .back-btn:hover {
    background-color: #45a049;
  }
</style>
