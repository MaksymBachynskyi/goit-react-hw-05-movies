import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './LayoutComponent.jsx/Layout';
const Movies = lazy(() => import('pages/moviesPage.jsx/movies'));
const MovieDetails = lazy(() =>
  import('pages/moveDetailPage.jsx/movieDetails')
);
const Cast = lazy(() => import('./cast'));
const Reviews = lazy(() => import('./reviewsComponent.jsx/reviews'));
const Home = lazy(() => import('pages/homePage.jsx/home'));
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
