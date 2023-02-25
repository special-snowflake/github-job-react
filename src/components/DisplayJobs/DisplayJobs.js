import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import './DisplayJobs.css';

function JobListing(props) {
  const { id, type, created_at, company, location, title } = props.data;
  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });
  return (
    <Link to={`/detail/${id}`} className="text-decoration-none">
      <Row className="bg-light p-3 mb-3">
        <Col xs={12} md={6} className="d-flex align-items-center">
          <div className="text-start">
            <h4 className="color-blue">{title}</h4>
            <p>
              <span className="color-green">{company}</span> |{' '}
              <span className="color-grey">{type}</span>
            </p>
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-end"
        >
          <div className="text-end color-grey">
            <p>{location}</p>
            <p>{formattedDate}</p>
          </div>
        </Col>
      </Row>
    </Link>
  );
}

export default JobListing;
