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
import { Link } from "react-router-dom";

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
  let url_string = window.location.href;
  var url = new URL(url_string);
  var userId = url.searchParams.get("userId");
  const [balanceAmt, setBalanceAmt] = useState(0);

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://localhost:5000/api/user/userTransaction/${userId}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setBalanceAmt(response.data.task.balanceAmt);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const creditAmt = () => {
    var amt = document.getElementById("creditAmt").value;
    if (amt == "") {
      alert("please enter an amount");
      return;
    }
    var newAmt = balanceAmt + Number(amt);
    if (newAmt > 500) {
      alert("max Rs. 500 can be added");
      return;
    } else {
      setBalanceAmt(newAmt);
    }
    var data = {};
    data["timeStamp"] = new Date().toLocaleString();
    data["amount"] = amt;
    data["transactionType"] = "credit";
    var config = {
      method: "post",
      url: `http://localhost:5000/api/user/transactionUpdate/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log("amount credited");
      })
      .catch(function (error) {
        console.log(error);
      });
    document.getElementById("creditAmt").value = "";
  };

  const debitAmt = () => {
    var amt = document.getElementById("debitAmt").value;
    if (amt == "") {
      alert("please enter an amount");
      return;
    }
    var newAmt = balanceAmt - Number(amt);
    if (newAmt < 0) {
      alert("Withdrawil amount is more than the balance");
      return;
    } else {
      setBalanceAmt(newAmt);
    }
    var data = {};
    data["timeStamp"] = new Date().toLocaleString();
    data["amount"] = amt;
    data["transactionType"] = "debit";
    var config = {
      method: "post",
      url: `http://localhost:5000/api/user/transactionUpdate/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log("amount debited");
      })
      .catch(function (error) {
        console.log(error);
      });
    document.getElementById("debitAmt").value = "";
  };

  return (
    <Container fluid>
      <NavBar></NavBar>
      <Row>
        <Lottie options={createUserLottie} height={150} width={150} />
      </Row>
      <h1 className="successMsg" style={{ fontSize: "30px" }}>
        Welcome to your profile
      </h1>
      <h1 className="successMsg" style={{ fontSize: "30px" }}>
        Balance Amount
      </h1>
      <Row className="d-flex justify-content-center">
        <Col md={3} className="d-flex justify-content-center">
          <Card>
            <h1 className="successMsg">{balanceAmt}</h1>
          </Card>
        </Col>
      </Row>

      <Row
        className="d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <Col md={5}>
          <Card>
            <Row className="d-flex justify-content-center">
              <Col md={10} className="d-flex justify-content-center">
                <h3>Debit Amount</h3>
              </Col>
              <Col
                md={10}
                className="d-flex justify-content-center"
                style={{ marginTop: "30px" }}
              >
                <input
                  id="debitAmt"
                  className="form-control form-control-lg"
                  type="number"
                  placeholder="Enter the amount"
                ></input>
              </Col>
              <Col
                md={10}
                className="d-flex justify-content-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Button variant="danger" onClick={debitAmt}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Row className="d-flex justify-content-center">
              <Col md={10} className="d-flex justify-content-center">
                <h3>Credit Amount</h3>
              </Col>
              <Col
                md={10}
                className="d-flex justify-content-center"
                style={{ marginTop: "30px" }}
              >
                <input
                  id="creditAmt"
                  className="form-control form-control-lg"
                  type="number"
                  placeholder="Enter the amount"
                ></input>
              </Col>
              <Col
                md={10}
                className="d-flex justify-content-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Button variant="success" onClick={creditAmt}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <Col md={8} className="d-flex justify-content-center">
          <Link to={`/transactionList?userId=${userId}`}>
            <Button varient="success">Transaction History</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualStudent;
