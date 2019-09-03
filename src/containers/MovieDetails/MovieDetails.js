import React, { Component } from 'react';
import { getMovieDetailsById, getMovieReviews } from '../../services/movieAPI';
import {
  BASE_BACKDROP_PATH,
  BASE_POSTER_PATH,
} from '../../constants/Constants';
import Review from '../../components/Review/Review'
import './MovieDetails.scss';

export default class MovieDetails extends Component {
  state = {
    movieInfo: null,
    movieReviews: null,
    loading: true,
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      const movieInfo = await getMovieDetailsById(this.props.match.params.id);
      const movieReviews = await getMovieReviews(this.props.match.params.id);
      this.setState({ loading: false, movieInfo, movieReviews });
    }
  }

  render() {
    const { movieInfo, loading, movieReviews } = this.state;
    let reviews;
    if (movieReviews) {
      reviews = movieReviews.map(review => {
        return <Review key={review.id} review={review} />
      })
    }
    

    let movieDetails = null;

    if (loading) {
      movieDetails = (
        <>
          {' '}
          <h1>Movie Details</h1>
          <h3>Loading movie details now...</h3>
        </>
      );
    }

    if (!loading && movieInfo) {
      movieDetails = (
        <div className="movie-details-wrapper">
          <h1>{movieInfo.title}</h1>
          <img
            className="movie-details-backdrop"
            src={`${BASE_BACKDROP_PATH}${movieInfo.backdrop_path}`}
            alt="movie background"
          />
          <div className="movie-details-poster-wrapper">
            <img
              className="movie-details-poster"
              src={`${BASE_POSTER_PATH}/w500/${movieInfo.poster_path}`}
              alt="movie poster"
            />
            <div className="movie-details-info">
              <div>
                <strong>Movie Overview:</strong> {movieInfo.overview}
              </div>
              <div>
                <strong>Release Date:</strong> {movieInfo.release_date}
              </div>
              <div>
                <strong>Average Rating:</strong> {movieInfo.vote_average}
              </div>
             {reviews.length && <div>
                <strong>Reviews:</strong> {reviews}
              </div>}
            </div>
          </div>
        </div>
      );
    }

    return <>{movieDetails}</>;
  }
}
