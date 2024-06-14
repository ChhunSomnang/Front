import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleLogin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get( `http://localhost:8000/api/auth/callback${window.location.search}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data);
        const user = response.data;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/", { state: { userData: response.data.user } });
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [navigate]);

  function fetchUserData() {
    axios
      .get(`http://localhost:8000/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + data.access_token,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (loading) {
    return <DisplayLoading />;
  } else {
    if (user != null) {
      return <DisplayData data={user} />;
    } else {
      return (
        <div>
          <DisplayData data={data} />
          <div style={{ marginTop: 10 }}>
            <button onClick={fetchUserData}>Fetch User</button>
          </div>
        </div>
      );
    }
  }
}

function DisplayLoading() {
  return <div>Loading....</div>;
}

function DisplayData(data) {
  return (
    <div>
      <samp>{JSON.stringify(data.data, null, 2)}</samp>
    </div>
  );
}

export default GoogleLogin;