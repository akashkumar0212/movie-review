import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReviewForm from "../reviewform/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
 
  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/reviews", {reviewBody: rev.value,imdbId:movieId});

    //   const updatedReviews = [...reviews, { body: rev.value }];
    const updatedReviews = reviews != null
                ? [...reviews, { body: rev.value }]
                : [{ body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="review-container">
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"/>
                </Col>
              </Row>
              <Row>
                <Col><hr /></Col>
              </Row>
            </>
          }
          {
            reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
