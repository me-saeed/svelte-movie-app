<!-- src/components/MovieList.svelte -->

<script lang="ts">
 
  
  export let movies: Array<{
    id: number;
    title: string;
    overview: string;
    poster: string;
  }> = [];

   import { goto } from '$app/navigation';
  
  function goToMovieDetails(id: number) {
   goto(`/movies/${id}`); // Navigate to dynamic route
  }
</script>

<div class="movie-list">
  {#each movies as movie}
    <button
      class="movie-card"
      on:click={() => goToMovieDetails(movie.id)}
      
      aria-label={`View details for ${movie.title}`}
    >
      <img src={movie.poster} alt={movie.title} />
      <div class="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    </button>
  {/each}
</div>


<style>
  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .movie-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    max-width: 300px;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }

  .movie-card img {
    width: 100%;
    height: auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .movie-details {
    padding: 16px;
    background-color: #f9f9f9;
  }

  .movie-details h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #333;
  }

  .movie-details p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
