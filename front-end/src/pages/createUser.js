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
  const [editFlag, setEditFlag] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);

  //user details state

  const [userName, setName] = useState("");
  const [userSurname, setSurname] = useState("");
  const [userDOB, setDOB] = useState("");
  const [userUserName, setUserName] = useState("");
  const [userPass, setPass] = useState("");
  const [confUserPass, setConfPass] = useState("");

  useEffect(() => {
    setName("");
    setSurname("");
    setDOB("");
    setUserName("");
    setPass("");
    setConfPass("");

    setTimeout(() => {
      if (successFlag === true) {
        setSuccessFlag(false);
      }
    }, 1000);
  }, [successFlag]);

  const saveChanges = () => {
    if (
      userName === "" ||
      userSurname === "" ||
      userDOB === "" ||
      userUserName === "" ||
      userPass === "" ||
      confUserPass === ""
    ) {
      alert("please enter all the fields");
      return;
    }

    if (userPass !== confUserPass) {
      alert("Passord not match please enter again");
      setPass("");
      setConfPass("");
      return;
    }
    var data = JSON.stringify({
      name: userName,
      surname: userSurname,
      dob: userDOB,
      username: userUserName,
      password: userPass,
    });

    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost:5000/api/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setEditFlag(false);
        setSuccessFlag(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const EditBtn = () => {
    if (editFlag) {
      return (
        <Button variant="success" onClick={saveChanges}>
          Submit
        </Button>
      );
    } else {
      return <></>;
    }
  };

  const SuccessMsg = () => {
    if (successFlag) {
      return <h3 className="successMsg">User Successfully Added</h3>;
    } else {
      return <></>;
    }
  };

  return (
    <Container fluid>
      <NavBar></NavBar>
      <Row>
        <Lottie options={createUserLottie} height={150} width={150} />
      </Row>
      <h1 className="successMsg">Add User</h1>

      <Row className="d-flex justify-content-center">
        <Col md={7}>
          <Card>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Name</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => {
                    setName(e.target.value);
                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Surname</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter your surname"
                  value={userSurname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Date of Birth</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="date"
                  placeholder="DOB"
                  value={userDOB}
                  onChange={(e) => {
                    setDOB(e.target.value);
                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Username</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="UserName"
                  value={userUserName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Password</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={userPass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={4} className="d-flex justify-content-center">
                <h3>Confirm Password</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={confUserPass}
                  onChange={(e) => {
                    setConfPass(e.target.value);

                    setEditFlag(true);
                  }}
                ></input>
              </Col>
            </Row>
            <Row className="topSpace25"></Row>
            <Row md={10}>
              <Col md={12} className="d-flex justify-content-center">
                <EditBtn></EditBtn>
              </Col>
            </Row>
            <Row md={10}>
              <Col md={12} className="d-flex justify-content-center">
                <SuccessMsg />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualStudent;
