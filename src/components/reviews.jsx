import { getReviews } from 'fetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
const UlStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledTitle = styled.h2`
  margin-bottom: 12px;
`;
export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setRewievs] = useState(0);

  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();
    const fetchedEl = async () => {
      try {
        const item = await getReviews(movieId, { signal: controller.signal });
        setRewievs(item.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedEl();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <UlStyled>
      {reviews.total_results > 0 ? (
        reviews.results.map(item => (
          <li key={item.id}>
            <StyledTitle>{item.author}</StyledTitle>
            <p>{item.content}</p>
          </li>
        ))
      ) : (
        <p>Sorry we dont have any reviews </p>
      )}
    </UlStyled>
  );
}
