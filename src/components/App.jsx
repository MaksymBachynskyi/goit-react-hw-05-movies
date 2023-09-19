import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './Layout';
const Movies = lazy(() => import('pages/movies'));
const MovieDetails = lazy(() => import('pages/movieDetails'));
const Cast = lazy(() => import('./cast'));
const Reviews = lazy(() => import('./reviews'));
const Home = lazy(() => import('pages/home'));
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
