import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { API_URL } from "../../configs/app.config";
import { Link } from "react-router-dom";
import Default from "../../assets/images/default.png";

const UserLists = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Cookies.get("user_token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchProjects = (page = 1) =>
    fetch(`${API_URL}api/v1/account/list/?page=` + page, requestOptions).then(
      (res) => res.json()
    );

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true }
  );
  return (
    <React.Fragment>
      <Row className="m-0 p-0">
        {isLoading ? (
          <div className="text-center my-3">Юкланмоқда...</div>
        ) : isError ? (
          <div className="text-center my-3">Хатолик: {error?.message}</div>
        ) : (
          <div className="text-center my-3">
            <Row className="bg-white text-dark p-3 mb-3 rounded border border-dark">
              <Col md={3} className="text-center">
                Профиль фотосурати
              </Col>
              <Col md={3} className="text-center">
                ФИО
              </Col>
              <Col md={3} className="text-center">
                Фамилияси
              </Col>
              <Col md={3} className="text-center">
                Телефон рақами/Email
              </Col>
            </Row>
            {data.results?.map((item, index) => (
              <Link key={item.guid} to={`user/:${item.guid}`}>
                <Row className="bg-white text-dark p-3 mb-4">
                  <Col md={3}>
                    <img
                      width={25}
                      alt={item.profile_picture?.substring(0, 10)}
                      src={item.profile_picture || Default}
                    />
                  </Col>
                  <Col md={3}>{item.first_name}</Col>
                  <Col md={3}>{item.last_name}</Col>
                  <Col md={3}>{item.username}</Col>
                </Row>
              </Link>
            ))}
          </div>
        )}
      </Row>
      <div className="d-flex gap-4 mb-4">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          color="warning"
        >
          Олдинги саҳифа
        </Button>{" "}
        <Button
          color="success"
          onClick={() => {
            if (!isPreviousData && data.next) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.next}
        >
          Кейинги саҳифа
        </Button>
      </div>
    </React.Fragment>
  );
};

export default UserLists;
