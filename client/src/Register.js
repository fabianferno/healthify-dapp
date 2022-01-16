import { useContext, useState, useRef } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";

// let ContractKit = require("@celo/contractkit");

function Register() {
  const { address, contract } = useContext(UserContext);
  const [formToggle, setFormToggle] = useState(false);
  let history = useHistory();

  const patientIdInputRef = useRef();
  const patientNameInputRef = useRef();
  const patientAddressInputRef = useRef();
  const patientPhoneInputRef = useRef();
  // const patientAgeInputRef = useRef();
  const patientBloodGroupInputRef = useRef();

  const doctorIdInputRef = useRef();
  const doctorNameInputRef = useRef();
  const doctorAddressInputRef = useRef();
  const doctorPhoneInputRef = useRef();
  const doctorPracticeInputRef = useRef();
  const doctorExpertiseInputRef = useRef();

  async function createDoctor() {
    var doctorId = doctorIdInputRef.current.value;
    var doctorName = doctorNameInputRef.current.value;
    var doctorAddress = doctorAddressInputRef.current.value;
    var doctorPhone = doctorPhoneInputRef.current.value;
    var doctorPractice = doctorPracticeInputRef.current.value;
    var doctorExpertise = doctorExpertiseInputRef.current.value;

    console.log(
      doctorName,
      doctorAddress,
      doctorPhone,
      doctorPractice,
      doctorExpertise
    );

    const receipt = await contract.methods
      .addDoctor(
        doctorId,
        doctorName,
        doctorPractice,
        doctorExpertise,
        doctorPhone,
        doctorAddress
      )
      .send({
        from: address,
      });
    console.log(receipt);

    // Call API to create doctor
    history.push("/doctor");
  }

  async function createPatient() {
    var patientId = patientIdInputRef.current.value;
    var patientName = patientNameInputRef.current.value;
    var patientAddress = patientAddressInputRef.current.value;
    var patientPhone = patientPhoneInputRef.current.value;
    // var patientAge = patientAgeInputRef.current.value;
    var patientBloodGroup = patientBloodGroupInputRef.current.value;

    console.log(patientName, patientAddress, patientPhone, patientBloodGroup);

    const receipt = await contract.methods
      .addPatientInfo(
        patientId,
        patientName,
        patientAddress,
        patientPhone,
        patientBloodGroup
      )
      .send({
        from: address,
      });
    console.log(receipt);
    history.push("/patient");

    // Call API to create patient
  }

  // const register = async function () {
  //   const receipt = await contract.methods
  //     .addPatientInfo(25, "fifrefel", "adefefr5", 20, "A+")
  //     .send({
  //       from: address,
  //     });
  //   console.log(receipt);
  // };

  const reg = function () {
    history.push("/patient");
  };

  return (
    <Layout>
      <section className="pt-5">
        {formToggle ? (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="fw-bold text-white ">Create a Doctor</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create Patient" : "Create Doctor"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group my-4">
                  <label htmlFor="inputId" className="text-secondary">
                    Id
                  </label>
                  <input
                    ref={doctorIdInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputId"
                    placeholder="Doctor Id"
                  />
                </div>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={doctorNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="Patient Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={doctorAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={doctorPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="inputPractice" className="text-secondary">
                    Practice Type
                  </label>
                  <input
                    ref={doctorPracticeInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPractice"
                    placeholder="Practice Type - Eg. Hospital"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputExpertise" className="text-secondary">
                    Area of Expertise
                  </label>
                  <input
                    ref={doctorExpertiseInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputExpertise"
                    placeholder="Area of Expertise - Eg. Cardiology"
                  />
                </div>
              </form>

              <div
                onClick={() => createDoctor()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >
                Create Doctor and Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold text-white">Create a Patient</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create Patient" : "Create Doctor"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group  my-4">
                  <label htmlFor="inputId" className="text-secondary">
                    Id
                  </label>
                  <input
                    ref={patientIdInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputId"
                    placeholder="Patient Id"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={patientNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="Patient Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={patientAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={patientPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputBlood" className="text-secondary">
                    Blood Group
                  </label>
                  <select
                    ref={patientBloodGroupInputRef}
                    id="inputBlood"
                    style={{ width: "100%" }}
                    className={
                      "p-3 d-flex bg-dark text-white rounded focus-none"
                    }
                    aria-label="Default select example"
                  >
                    <option selected>Choose a Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </form>

              <div
                onClick={() => createPatient()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >
                Create Patient and Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
