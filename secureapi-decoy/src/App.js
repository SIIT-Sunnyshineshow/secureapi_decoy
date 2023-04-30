import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [authenUser, setAuthenUser] = useState("SampleUserCredentiallnwza007");
  const [secret, setSecret] = useState(
    "9ca692bde4083896e2c3ced55f49710f1151ebd4dae0c6eb43d3e8ee9c09a3637b8c7aaaf6e967e8004f070237c4a447bbccf1d528ef081342f5d30bdb3e1123"
  );
  const [channelAccess, setChannelAccess] = useState(
    "51f6422e84e0a77045d900d0fe05b552"
  );
  const attribute = ["Test"];

  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [log, setLog] = useState("Log will be display here");

  const app_id = "644cadf65b881744c539ef5a";
  const api =
    "http://localhost:8080/api/oauth/oapi/get/f4739c1f7578916311a85cf182a6f161668a61722b59fd65f933e313508e07c7";

  const getSecret = () => {
    axios
      .post("http://localhost:8080/api/oauth/gettokens", {
        user_id: authenUser,
        permission: secret,
      })
      .then((res) => {
        setLog("Token Loaded");
        console.log(res.data);
        setAccessToken(res.data.OAccessTokenSet);
        setRefreshToken(res.data.ORefreshTokenSet);
      });
  };

  const callApi = () => {
    if (!accessToken) {
      setLog("Required Access Token");
      return;
    }

    if (!refreshToken) {
      setLog("Required Refresh Token");
      return;
    }

    if (!secret) {
      setLog("Required Permission");
      return;
    }

    if (!channelAccess) {
      setLog("Required Channel Access");
      return;
    }

    if (!authenUser) {
      setLog("Required Authentication of User");
      return;
    }

    let headers = {
      oaccesstoken: accessToken,
      orefreshtoken: refreshToken,
      user_id: authenUser,
      app_id: app_id,
      channel_access: channelAccess,
    };

    console.log(headers);
    axios
      .get(
        "http://localhost:8080/api/oauth/oapi/get/f4739c1f7578916311a85cf182a6f161668a61722b59fd65f933e313508e07c7",
        { headers: headers }
      )
      .then((res) => {
        setLog(JSON.stringify(res.data));
      })
      .catch((err) => {
        setLog(JSON.stringify(err));
      });
  };

  return (
    <div className="App" style={{ textAlign: "left", margin: "20px" }}>
      Authentication User:{" "}
      <input
        type="text"
        value={authenUser}
        style={{
          borderTop: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderBottom: "1px solid",
          width: "50%",
        }}
        onChange={(e) => setAuthenUser(e.target.value)}
      />{" "}
      <br />
      App ID: {app_id}
      <br />
      Attribute: {attribute.toString()}
      <br />
      Permission:{" "}
      <input
        type="text"
        value={secret}
        style={{
          borderTop: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderBottom: "1px solid",
          width: "50%",
        }}
        onChange={(e) => setSecret(e.target.value)}
      />{" "}
      <br />
      Channel Access:{" "}
      <input
        type="text"
        value={channelAccess}
        style={{
          borderTop: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderBottom: "1px solid",
          width: "50%",
        }}
        onChange={(e) => setChannelAccess(e.target.value)}
      />{" "}
      <br />
      OAccessToken: <br />
      <input
        type="text"
        value={accessToken}
        style={{ width: "50%" }}
        disabled
      />
      <br />
      ORefresh Token: <br />
      <input
        type="text"
        value={refreshToken}
        style={{ width: "50%" }}
        disabled
      />
      <br />
      API: <br />
      <input type="text" value={api} style={{ width: "50%" }} disabled />
      <br />
      <button onClick={() => getSecret()}>Get Secret</button>
      <button onClick={() => callApi()}>Call API</button>
      <p>{log}</p>
    </div>
  );
}

export default App;
