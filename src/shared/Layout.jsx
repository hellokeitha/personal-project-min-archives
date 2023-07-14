// src/shared/Layout.js

import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderStyles = {
  width: "100%",
  background: "black",
  height: "50px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  color: "white",
  fontWeight: "600",
};

const FooterStyles = {
  width: "100%",
  height: "50px",
  display: "flex",
  background: "black",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
};

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{ ...HeaderStyles }}>
      <span onClick={() => navigate("/")}>SSB</span>
      <p onClick={() => navigate("/mypage")}>My Page</p>
      <p onClick={() => navigate("/login")}>Login</p>
      <p onClick={() => navigate("/join")}>Join</p>
      <button onClick={() => navigate("/write")}> Write Post</button>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ ...FooterStyles }}>
      <span>copyright @KEITHABAEK</span>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
