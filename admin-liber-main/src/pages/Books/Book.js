import React, { useState } from "react";
import { Button, Row } from "reactstrap";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { API_URL } from "../../configs/app.config";
import BookTable from "./BookTable";

const Book = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Cookies.get("user_token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchProjects = (page = 1) =>
    fetch(`${API_URL}api/v1/book/list/?page=` + page, requestOptions).then(
      (res) => res.json()
    );

  const { isLoading, isError, error, refetch, data, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true }
  );
  console.log(data);
  return (
    <React.Fragment>
      <Row className="m-0 p-0">
        {isLoading ? (
          <div className="text-center my-3">Юкланмоқда...</div>
        ) : isError ? (
          <div className="text-center my-3">Хатолик: {error?.message}</div>
        ) : (
          <div>
            {" "}
            <BookTable refetch={refetch} data={data} />
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
        </Button>
        <Button
          onClick={() => {
            if (!isPreviousData && data.next) {
              setPage((old) => old + 1);
            }
          }}
          color="success"
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.next}
        >
          Кейинги саҳифа
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Book;
