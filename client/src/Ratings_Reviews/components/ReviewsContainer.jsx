/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';

const Container = styled.div`
  width: 100%;
  max-height: 90vh;
  overflow-y: scroll;

`;
const ReviewsContainer = ({ reviews, reviewLimit, search }) => {
  function displayReviews() {
    return reviews
      .filter((review) => !search || review.body.toLowerCase().indexOf(search) !== -1 || review.summary.toLowerCase().indexOf(search) !== -1)
      .filter((review, index) => index < reviewLimit)
      .map((review) => <Review review={review} search={search} />);
  }

  return (
    <Container>
      {displayReviews()}
    </Container>
  );
};

export default ReviewsContainer;
