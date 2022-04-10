import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./style/app.css";
import NavBar from "./Component/navBar";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Lottie from "react-lottie";
import createLottie from "./lottie/newUser.json";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

const createUserLottie = {
  loop: true,
  autoplay: true,
  animationData: createLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const IndividualStudent = () => {
  const [userUserName, setUserName] = useState("");
  const [userPass, setPass] = useState("");

  const loginFunc = () => {
    if (userUserName === "" || userPass === "") {
      alert("please enter all the fields");
      return;
    }
    var data = JSON.stringify({
      username: userUserName,
      password: userPass,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        var loginFlag = response.data.responseBody.loginFlag;
        var userId = response.data.responseBody.userId;

        if (loginFlag) {
          document.location = `/userTransaction?userId=${userId}`;
        } else {
          alert("Incorrect Id or password");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //login API
  };

  return (
    <Container fluid>
      <NavBar></NavBar>
      <Row>
        <Lottie options={createUserLottie} height={150} width={150} />
      </Row>
      <h1 className="successMsg" style={{ fontSize: "30px" }}>
        Sign In
      </h1>
      <Row
        className="d-flex justify-content-center"
        style={{ marginTop: "30px" }}
      >
        <Col md={5}>
          <Row md={10}>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userUserName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
          </Row>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Col md={5}>
          <Row md={10}>
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={userPass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            ></input>
          </Row>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Col md={2}>
          <Row md={10}>
            <Button variant="success" onClick={loginFunc}>
              Login
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualStudent;
