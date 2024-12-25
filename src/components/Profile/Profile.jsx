import { Button, Container } from "react-bootstrap";
import style from "./Profile.module.css";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  checkIfLoggedIn,
  getUserDetails,
  registerUser,
  updateUser,
} from "../../services/auth.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Profile = () => {
  const [params] = useSearchParams();
  const role = params.get("role");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobileNo: "",
    email: "",
    username: "",
    achievements: "",
  });
  const [mobileError, setMobileError] = useState("");
  const [name, setName] = useState(userDetails.name);
  const [mobile, setMobile] = useState(userDetails.mobileNo);
  const [email, setEmail] = useState(userDetails.email);
  const [username, setusername] = useState(userDetails.username);
  const [department, setDepartment] = useState(userDetails.department);
  const [year, setYear] = useState(userDetails.year);
  const [gpa, setGpa] = useState(userDetails.gpa);
  const [aadhaarNumber, setAadhaarNumber] = useState(userDetails.aadhar);
  const [panNumber, setPanNumber] = useState(userDetails.pan);
  const [panError, setPanError] = useState("");
  const [aadharError, setAadharError] = useState("");

  const user = checkIfLoggedIn();
  const getUser = async () => {
    try {
      const userDetails = await getUserDetails(user);
      setUserDetails(userDetails.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const achievementsRef = useRef();

  const [achievements, setAchievements] = useState(
    userDetails.achievements ? userDetails.achievements.split(",") : []
  );

  const skillsRef = useRef();

  const [skills, setSkills] = useState(
    userDetails.skills ? userDetails.skills.split(",") : []
  );

  const interestRef = useRef();

  const [interests, setInterests] = useState(
    userDetails.interests ? userDetails.interests.split(",") : []
  );

  useEffect(() => {
    document.title = "Profile";
    getUser();
  }, []);

  useEffect(() => {
    if (userDetails.name) {
      setName(userDetails.name);
    }

    if (userDetails.mobile_no) {
      setMobile(userDetails.mobile_no);
    }

    if (userDetails.aadhar) {
      setAadhaarNumber(userDetails.aadhar);
    }

    if (userDetails.pan) {
      setPanNumber(userDetails.pan);
    }

    if (userDetails.email) {
      setEmail(userDetails.email);
    }

    if (userDetails.username) {
      setusername(userDetails.username);
    }

    if (userDetails.achievements) {
      setAchievements(userDetails.achievements.split(","));
    }

    if (userDetails.department) {
      setDepartment(userDetails.department);
    }

    if (userDetails.year) {
      setYear(userDetails.year);
    }

    if (userDetails.gpa) {
      setGpa(userDetails.gpa);
    }

    if (userDetails.skills) {
      setSkills(userDetails.skills.split(","));
    }

    if (userDetails.interests) {
      setInterests(userDetails.interests.split(","));
    }
  }, [userDetails]);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const mobileChangeHandler = (e) => {
    setMobile(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameChangeHandler = (e) => {
    setusername(e.target.value);
  };

  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };

  const yearChangeHandler = (e) => {
    setYear(e.target.value);
  };

  const gpaChangeHandler = (e) => {
    setGpa(e.target.value);
  };

  const isValidAadhaar = (aadhaar) => /^[2-9]{1}[0-9]{11}$/.test(aadhaar);

  const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  const handleAadharChange = (e) => {
    const value = e.target.value;
    setAadhaarNumber(value);
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase
    setPanNumber(value);
  };

  const achievementsChangeHandler = (e) => {
    if (e.target.value) {
      const achs = [...achievements];
      achs.push(e.target.value);
      setAchievements(achs);
      achievementsRef.current.value = null;
      achievementsRef.current.focus();
    }
  };

  const skillsChangeHandler = (e) => {
    if (e.target.value) {
      const skils = [...skills];
      skils.push(e.target.value);
      setSkills(skils);
      skillsRef.current.value = null;
      skillsRef.current.focus();
    }
  };

  const interestsChangeHandler = (e) => {
    if (e.target.value) {
      const interestss = [...interests];
      interestss.push(e.target.value);
      setInterests(interestss);
      interestRef.current.value = null;
      interestRef.current.focus();
    }
  };

  const removeAchievement = (index) => {
    const achs = [...achievements];
    achs.splice(index, 1);
    setAchievements(achs);
  };

  const removeSkill = (index) => {
    const skils = [...skills];
    skils.splice(index, 1);
    setSkills(skils);
  };

  const removeInterest = (index) => {
    const interestss = [...interests];
    interestss.splice(index, 1);
    setInterests(interestss);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setMobileError("");
    setError("");

    if (mobile.length != 10) {
      setError("Mobile Number should be 10 digit");
      return false;
    }

    // Check validity
    if (aadhaarNumber && !isValidAadhaar(aadhaarNumber)) {
      setError("Invalid Aadhaar number. Must be 12 digits and start with 2-9.");
      return false;
    }

    // Check validity
    if (panNumber && !isValidPAN(panNumber)) {
      setError("Invalid PAN number. Format must be AAAAA1234A.");
      return false;
    }

    const updatedPayload = {
      name,
      email,
      username,
      mobile_no: mobile,
      department,
      year,
      gpa,
      aadhar: aadhaarNumber,
      pan: panNumber,
      achievements: achievements.join(","),
      skills: skills.join(","),
      interests: interests.join(","),
      role,
    };
    const response = await updateUser(userDetails.id, updatedPayload);
    if (response.status == false) {
      setError(response.message);
      return false;
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className={style.main}>
        <h3>Profile</h3>
        {error ? <p className="error">{error}</p> : ""}
        <form id="studentRegister" onSubmit={updateProfile}>
          <Container>
            <Row>
              <Col>
                <div>
                  <label htmlFor="name">Name</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    className={style.input}
                    onChange={nameChangeHandler}
                    autoComplete="off"
                    required
                    value={name}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Email ID"
                    name="email"
                    id="email"
                    className={style.input}
                    onChange={emailChangeHandler}
                    value={email}
                    autoComplete="off"
                    required
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="mobile">Mobile No</label>
                  <br />
                  <Form.Control
                    type="number"
                    placeholder="Mobile No"
                    name="mobile"
                    id="mobile"
                    className={style.input}
                    autoComplete="off"
                    required
                    value={mobile}
                    onChange={mobileChangeHandler}
                    minLength={10}
                    size={10}
                    maxLength={10}
                  />
                  <span className="error">{mobileError}</span>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <div>
                  <label htmlFor="username">Username</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    className={style.input}
                    onChange={usernameChangeHandler}
                    value={username}
                    autoComplete="off"
                    required
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="department">Department</label>
                  <br />
                  <Form.Select
                    aria-label="Select Department"
                    className={style.input}
                    value={department}
                    onChange={departmentChangeHandler}
                  >
                    <option>Select Department</option>
                    <option value="1">Mechanical</option>
                    <option value="2">Electrical</option>
                    <option value="3">Civil</option>
                  </Form.Select>
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="year">Year</label>
                  <br />
                  <Form.Select
                    aria-label="Select Year"
                    className={style.input}
                    value={year}
                    onChange={yearChangeHandler}
                  >
                    <option>Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <div>
                  <label htmlFor="gpa">GPA</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="GPA"
                    name="gpa"
                    id="gpa"
                    value={gpa}
                    onChange={gpaChangeHandler}
                    className={style.input}
                    autoComplete="off"
                    required
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="aadhar_no">Aadhar No</label>
                  <br />
                  <Form.Control
                    type="number"
                    placeholder="Aadhar No."
                    name="aadhar_no"
                    id="aadhar_no"
                    className={style.input}
                    value={aadhaarNumber}
                    onChange={handleAadharChange}
                    autoComplete="off"
                    required
                    minLength={12}
                    size={12}
                    maxLength={12}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="pan">PAN</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="PAN"
                    name="pan"
                    id="pan"
                    value={panNumber}
                    onChange={handlePanChange}
                    className={style.input}
                    autoComplete="off"
                    required
                    minLength={10}
                    size={10}
                    maxLength={10}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <div>
                  <label htmlFor="achievements">Achievements</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Achievements"
                    name="achievements"
                    id="achievements"
                    onBlur={achievementsChangeHandler}
                    className={style.input}
                    autoComplete="off"
                    ref={achievementsRef}
                  />
                </div>
              </Col>

              <Col>
                <div>
                  <label htmlFor="skills">Skills</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Skills"
                    name="skills"
                    onBlur={skillsChangeHandler}
                    id="skills"
                    className={style.input}
                    autoComplete="off"
                    ref={skillsRef}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="interests">Interests</label>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Interests"
                    name="interests"
                    id="interests"
                    ref={interestRef}
                    className={style.input}
                    autoComplete="off"
                    onBlur={interestsChangeHandler}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <ul>
                  {achievements.length > 0 &&
                    achievements.map((achievement, index) => (
                      <li key={index}>
                        {achievement}{" "}
                        <button onClick={() => removeAchievement(index)}>
                          X
                        </button>
                      </li>
                    ))}
                </ul>
              </Col>

              <Col>
                <ul>
                  {skills.length > 0 &&
                    skills.map((achievement, index) => (
                      <li key={index}>
                        {achievement}{" "}
                        <button onClick={() => removeSkill(index)}>X</button>
                      </li>
                    ))}
                </ul>
              </Col>

              <Col>
                <ul>
                  {interests.length > 0 &&
                    interests.map((interests, index) => (
                      <li key={index}>
                        {interests}{" "}
                        <button onClick={() => removeInterest(index)}>X</button>
                      </li>
                    ))}
                </ul>
              </Col>
            </Row>
          </Container>
          <br />
          <div className={style.button}>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
