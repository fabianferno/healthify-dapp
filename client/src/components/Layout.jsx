import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

import { Link, useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../UserContext";
import Logo from "../assets/img/healthify.png";

export default function Layout(props) {
  const location = useLocation();
  const { contract } = useContext(UserContext);
  var history = useHistory();

  const rd = async () => {
    // const t= await contract.methods.check(address).call()

    const t = await contract.methods.Identify().call();
    console.log(t);
    switch (t) {
      case "0":
        history.push("/register");
        break;
      case "1":
        history.push("/patient");
        break;
      case "2":
        history.push("/doctor");
        break;
      default:
        history.push("/");
        break;
    }
  };

  function Header() {
    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            marginTop: "-30px",
            paddingTop: "60px",
            paddingBottom: "30px",
          }}
          className={`fixed-top shadow px-md-4 px-3 d-flex justify-content-between  align-items-center pl-md-5 pl-4 ${
            location.pathname === "/register" ? "bg-dark" : "bg-black"
          } `}
        >
          <div className="d-flex col-12 align-items-center justify-content-between">
            <Link
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand fw-bold text-primary me-md-5  me-3"
            >
              <img height="50px" src={Logo} alt="" srcset="" />
              <span style={{ marginLeft: "15px" }}>healthify</span>
            </Link>
            {location.pathname === "/" && (
              <div
                onClick={() => rd()}
                className="p-3 btn btn-outline-primary fw-bold btn-lg "
              >
                Get Started
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2.5 }}
          style={{ paddingTop: "6vh" }}
          className={
            props.contained ? "container overflow-hidden" : "overflow-hidden"
          }
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
