import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getJobDetails } from '../../utils/https/jobs';
import './JobDetail.css';
import Headers from '../../components/Headers/Headers';
import imageError from '../../assets/images/img-error.png';

function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(imageError);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(data, id);
    if (!data && id) {
      getJobDetails(id).then((res) => {
        console.log(res);
        setData(res.data);
        setImage(res.data.company_logo);
      });
    }
  }, [data]);

  const handleImgError = () => {
    setImage(imageError);
  };
  // example job data
  const job = {
    id: id,
    title: 'Software Engineer',
    status: 'Full-time',
    company: 'Example Company',
    location: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ex in leo pretium tristique. Donec placerat augue eu sapien fringilla dignissim. Morbi vehicula, sem euismod aliquam consectetur, lorem nunc luctus tellus, eu aliquam dolor tellus sed velit.',
    requirements:
      'Maecenas ac tincidunt nulla. Donec faucibus consequat nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam aliquet vestibulum sem, at tincidunt libero bibendum vel. Etiam ornare ullamcorper quam id posuere. Donec quis lorem sed mi feugiat posuere.',
    applyLink: 'https://example.com/apply',
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Headers />
      <Container>
        <Button variant="secondary" onClick={handleBackClick} className="mb-3">
          Back
        </Button>
      </Container>
      {data ? (
        <>
          <Container className="top-border">
            <p>
              {data.type} | {data.location}
            </p>
            <h1 className="mt-1 mb-5">{data.title}</h1>
            <Row>
              <Col md={8}>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </Col>
              <Col md={4}>
                <div className="">
                  <div className="mb-4 normal-border pb-2">
                    <h3>{data.company}</h3>
                    <hr className="mb-0" style={{ opacity: '0.2' }} />
                    <img
                      src={image}
                      onError={handleImgError}
                      alt="Company Logo"
                      className="w-100"
                    />
                    <hr className="mb-0" style={{ opacity: '0.2' }} />
                    <a
                      href={data.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.company_url}
                    </a>
                  </div>
                  <div className="normal-border py-2 bg-yellow p-2">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default JobDetail;
