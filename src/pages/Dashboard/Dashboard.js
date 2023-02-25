import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Headers from '../../components/Headers/Headers';
import DisplayJobs from '../../components/DisplayJobs/DisplayJobs';
import { toast } from 'react-toastify';
import './Dashboard.css';
import { getListJobs } from '../../utils/https/jobs';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [fulltime, setFulltime] = useState(false);
  const [page, setPage] = useState(1);
  const [listJobs, setListJobs] = useState([]);
  const [isMoreJob, setIsMoreJobs] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    getListJobs(search, location, fulltime, page)
      .then((data) => {
        // console.log(data);
        let tmpData = [];
        if (data.code >= 400) {
          // toast.warn(data.message);
        } else {
          console.log('page', page);
          tmpData = data.data;
          if (page === 1) {
            setListJobs(tmpData);
          } else {
            const tmpArray = [...listJobs, ...tmpData];
            setListJobs(tmpArray);
            console.log('listJobs', listJobs);
          }
        }
        if (tmpData.length < 10) {
          console.log('lebih kecil');
          setIsMoreJobs(false);
        }
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

  const handleMoreJobs = (event) => {
    event.preventDefault();
    console.log('handle more jobs');
    const tmpPage = page + 1;
    setPage(tmpPage);
  };

  useEffect(() => {
    getListJobs(search, location, fulltime, page)
      .then((data) => {
        let tmpData = [];
        console.log(data);
        if (data.code >= 400) {
          toast.warn(data.message);
        } else {
          tmpData = data.data;
          if (page === 1) {
            setListJobs(data.data);
          } else {
            const tmpArray = [...listJobs, ...data.data];
            setListJobs(tmpArray);
            console.log('listJobs', listJobs);
          }
        }
        if (tmpData.length < 10) {
          console.log('lebih kecil');
          setIsMoreJobs(false);
        }
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  }, [page]);

  useEffect(() => {}, [search, fulltime, location, page]);

  return (
    <>
      <Headers />
      <Container>
        <Form
          onSubmit={(event) => {
            handleSubmit(event);
            setIsMoreJobs(true);
            setPage(1);
          }}
        >
          <Row className="justify-content-between align-items-end mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group controlId="fulltime">
                <Form.Label></Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Full Time"
                  checked={fulltime}
                  onChange={(event) => {
                    setFulltime(event.target.checked);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group controlId="submit">
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        {listJobs.length === 0 ? (
          <></>
        ) : (
          <>
            {listJobs.map((e) => (
              <DisplayJobs data={e} key={e.id} />
            ))}
          </>
        )}
        {/* <DisplayJobs /> */}
      </Container>
      <Container className="mb-5">
        {isMoreJob ? (
          <>
            <Button
              variant="primary"
              className="w-100"
              onClick={(event) => handleMoreJobs(event)}
            >
              More Jobs
            </Button>
          </>
        ) : (
          <>
            <div>No More Job to show.</div>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
