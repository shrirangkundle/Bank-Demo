import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./style/app.css";
import NavBar from "./Component/navBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Lottie from "react-lottie";
import studentListLottie from "./lottie/userList.json";

const listLottie = {
  loop: true,
  autoplay: true,
  animationData: studentListLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const StudentList = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [page, setPage] = useState(1);

  const [pageArr, setPageArr] = useState([]);
  let url_string = window.location.href;
  var url = new URL(url_string);
  var userId = url.searchParams.get("userId");

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://localhost:5000/api/user/transactionList/625172e248038626842167ec/${page}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setTransactionList(response.data.transactionArr);
        var pageNum = Math.ceil(response.data.maxLength / 10);
        var arr = [];
        for (let i = 0; i < pageNum; i++) {
          arr.push(i + 1);
        }
        setPageArr(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page]);

  return (
    <Container fluid>
      <NavBar></NavBar>
      <Row>
        <Lottie options={listLottie} height={150} width={750} />
      </Row>

      <Row
        md={10}
        id="studentDetails"
        className="d-flex justify-content-center"
      >
        <Col md={10}>
          <Row className="d-flex justify-content-center">
            <Col md={1} className="d-flex justify-content-center">
              <h3>S.No.</h3>
            </Col>
            <Col md={3} className="d-flex justify-content-center">
              <h3>Amount</h3>
            </Col>
            <Col md={2} className="d-flex justify-content-end">
              <h3>Type</h3>
            </Col>
            <Col md={4} className="d-flex justify-content-end">
              <h3>Time</h3>
            </Col>
          </Row>
        </Col>
        {transactionList.map((item, i) => {
          return (
            <Col md={10} className="userItem" key={i}>
              <Card body bg="success">
                <Row className="d-flex justify-content-center">
                  <Col md={1}>
                    <h3>{i + 1}</h3>
                  </Col>
                  <Col md={3} className="d-flex justify-content-center">
                    {item.amount}
                  </Col>
                  <Col md={2} className="d-flex justify-content-end">
                    {item.transactionType}
                  </Col>
                  <Col md={4} className="d-flex justify-content-end">
                    {item.timeStamp}
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="topSpace25"></Row>
      <Row className="d-flex justify-content-center">
        {pageArr.map((i) => {
          return (
            <Col key={i} md={1}>
              <Button
                onClick={() => {
                  setPage(i);
                }}
              >
                {i}
              </Button>
            </Col>
          );
        })}
      </Row>
      <Row className="topSpace25"></Row>
    </Container>
  );
};

export default StudentList;
