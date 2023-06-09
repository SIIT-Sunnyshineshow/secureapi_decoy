import { useEffect, useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import axios from "axios";


function Dashboard() {
  useEffect(() => {
    let user_id = localStorage.getItem("userID");
    let headers = {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      iv: localStorage.getItem("iv"),
      unique: localStorage.getItem("unique"),
    };
    axios
      .post("http://localhost:3001/api/getapp", user_id, { headers: headers })
      .then((response) => {
        console.log("Received response:", response.data);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  
      
    });
        return (
            <div>

        <div style={{ padding: "10px" }}>
        <h1 style={{ textAlign: "right", marginRight: "10px" }}>
          Hello, Welcome
        </h1>
        </div>

        <input type="text" placeholder="Write something..."/>
            <br/>
            <Card><br/>
            <Card.Header>UserNo.</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}
                  Do you have any detail to share{' '}
                </p>
              </blockquote>
            </Card.Body>
            </Card>
            </div>

    );
}

export default Dashboard;
