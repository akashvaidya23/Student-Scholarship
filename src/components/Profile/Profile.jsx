import { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import style from "./Profile.module.css";
import {
  checkIfLoggedIn,
  getScholarships,
  getUserDetails,
  updateUser,
} from "../../services/auth.js";

const Profile = () => {
  const [error, setError] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobileNo: "",
    email: "",
    username: "",
    department: "",
    year: "",
    gpa: "",
    aadhar: "",
    pan: "",
    skills: "",
    interests: "",
    verified: 0,
  });
  const [mobileError, setMobileError] = useState("");
  const [panError, setPanError] = useState("");
  const [aadharError, setAadharError] = useState("");

  const user = checkIfLoggedIn();

  const getUser = useCallback(async () => {
    try {
      const userDetails = await getUserDetails(user);
      setUserDetails(userDetails.data[0]);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    document.title = "Profile";
    getUser();
  }, [getUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const isValidAadhaar = (aadhaar) => /^[1-9]{1}[0-9]{11}$/.test(aadhaar);
  const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  const handleAadharChange = (e) => {
    const value = e.target.value;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      aadhar: value,
    }));
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      pan: value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setMobileError("");
    setError("");
    setAadharError("");
    setPanError("");

    if (userDetails.mobile_no.length !== 10) {
      setError("Mobile Number should be 10 digits");
      return false;
    }

    if (userDetails.aadhar && !isValidAadhaar(userDetails.aadhar)) {
      setAadharError(
        "Invalid Aadhaar number. Must be 12 digits and start with 2-9."
      );
      return false;
    }

    if (userDetails.pan && !isValidPAN(userDetails.pan)) {
      setPanError("Invalid PAN number. Format must be AAAAA1234A.");
      return false;
    }

    const response = await updateUser(userDetails.id, userDetails);
    console.log(response);

    if (response.status === false) {
      setError(response.message);
    } else {
      alert("Profile updated successfully");
    }
  };

  const suggestScholarship = async (e) => {
    e.preventDefault();
    let family_income;
    if (userDetails.family_income == "<1L") {
      family_income = "low";
    } else if (userDetails.family_income == "1L-2.5L") {
      family_income = "medium";
    } else {
      family_income = "high";
    }

    const response = await getScholarships({
      category: userDetails.category,
      gender: userDetails.gender,
      family_income: family_income,
      gpa: userDetails.gpa,
      k: 5,
    });
    console.log(response);
    setScholarships(response);
  };

  return (
    <div className={style.main}>
      <h3>Profile</h3>
      {error && <p className="error">{error}</p>}
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
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  value={userDetails.name}
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
                  onChange={handleChange}
                  value={userDetails.email}
                  autoComplete="off"
                  required
                />
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="mobileNo">Mobile No</label>
                <br />
                <Form.Control
                  type="number"
                  placeholder="Mobile No"
                  name="mobileNo"
                  id="mobileNo"
                  className={style.input}
                  autoComplete="off"
                  required
                  value={userDetails.mobile_no}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={userDetails.username}
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
                  name="department"
                  value={userDetails.department}
                  onChange={handleChange}
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
                  name="year"
                  value={userDetails.year}
                  onChange={handleChange}
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
                  value={userDetails.gpa}
                  onChange={handleChange}
                  className={style.input}
                  autoComplete="off"
                  required
                />
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="aadhar">Aadhar No</label>
                <br />
                <Form.Control
                  type="number"
                  placeholder="Aadhar No."
                  name="aadhar"
                  id="aadhar"
                  className={style.input}
                  value={userDetails.aadhar}
                  onChange={handleAadharChange}
                  autoComplete="off"
                  required
                  minLength={12}
                  size={12}
                  maxLength={12}
                />
                {aadharError && <span className="error">{aadharError}</span>}
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
                  value={userDetails.pan}
                  onChange={handlePanChange}
                  className={style.input}
                  autoComplete="off"
                  required
                  minLength={10}
                  size={10}
                  maxLength={10}
                />
                {panError && <span className="error">{panError}</span>}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div>
                <label htmlFor="caste">Caste</label>
                <br />
                <input
                  type="text"
                  placeholder="Caste"
                  name="caste"
                  id="caste"
                  value={userDetails.caste}
                  onChange={handleChange}
                  className={style.input}
                  autoComplete="off"
                  required
                />
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="gender">Gender</label>
                <br />
                <Form.Select
                  aria-label="Select Gender"
                  className={style.input}
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option selected={userDetails.gender == "male"} value="male">
                    Male
                  </option>
                  <option
                    selected={userDetails.gender == "female"}
                    value="female"
                  >
                    Female
                  </option>
                  <option
                    selected={userDetails.gender == "other"}
                    value="other"
                  >
                    Other
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="category">Category</label>
                <br />
                <Form.Select
                  aria-label="Select Category"
                  className={style.input}
                  name="category"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option selected={userDetails.category == "obc"} value="obc">
                    OBC
                  </option>
                  <option selected={userDetails.category == "sc"} value="sc">
                    SC
                  </option>
                  <option selected={userDetails.category == "st"} value="st">
                    ST
                  </option>
                </Form.Select>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div>
                <label htmlFor="specially_abled">Are you Specially Abled</label>
                <br />
                <Form.Select
                  aria-label="Select specially abled"
                  className={style.input}
                  name="specially_abled"
                  onChange={handleChange}
                >
                  <option value="">Are you specially abled</option>
                  <option selected={userDetails.specially_abled == 1} value="1">
                    Yes
                  </option>
                  <option selected={userDetails.specially_abled == 0} value="0">
                    No
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="income">Income of the Family</label>
                <br />
                <Form.Select
                  aria-label="Select income of the family"
                  className={style.input}
                  name="family_income"
                  onChange={handleChange}
                >
                  <option value="">Family Income</option>
                  <option
                    selected={userDetails.family_income === "<1L"}
                    value="<1L"
                  >
                    1 Lakh and below
                  </option>
                  <option
                    selected={userDetails.family_income === "1L - 2.5L"}
                    value="1L-2.5L"
                  >
                    1 Lakh to 2.5 Lakh
                  </option>
                  <option
                    selected={userDetails.family_income === "2.5L - 8L"}
                    value="2.5L-8L"
                  >
                    2.5 Lakh to 8 Lakh
                  </option>
                  <option
                    selected={userDetails.family_income === ">8L"}
                    value=">8L"
                  >
                    8 Lakh and above
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              {userDetails.verified == 2 && (
                <div>
                  <label htmlFor="suggest">Suggest Scholarship:</label>
                  <Button variety="primary" onClick={suggestScholarship}>
                    Get Scholarships
                  </Button>
                  {scholarships.length > 0 && (
                    <>
                      <label htmlFor="scholarships">Scholarships:</label>
                      <br />
                      {scholarships.map((scholarship) => (
                        <Form.Check
                          key={scholarship}
                          inline
                          label={scholarship}
                          name="verify"
                          type="radio"
                          value={scholarship}
                        />
                      ))}
                    </>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>{/* Add specially abled checkbox */}</Col>
            <Col>{/* Add Income Dropdown */}</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="status">Status</label>
                <br />
                {/* {userDetails.verified == 1 ? (
                  <b style={{ color: "green" }}>Verified</b>
                ) : (
                  <b style={{ color: "red" }}>Rejected</b>
                )} */}
                {userDetails.verified == 0 && (
                  <b style={{ color: "orange" }}>Pending</b>
                )}
                {userDetails.verified == 1 && (
                  <b style={{ color: "red" }}>Rejected</b>
                )}
                {userDetails.verified == 2 && (
                  <b style={{ color: "green" }}>Verified</b>
                )}
              </div>
            </Col>
            {userDetails.verified == 0 && userDetails.comments && (
              <Col>
                <div>
                  <label htmlFor="status">Comments:</label>
                  <br />
                  <b>{userDetails.comments}</b>
                </div>
              </Col>
            )}
            <Col></Col>
          </Row>
        </Container>
        <br />
        {userDetails.verified == 0 && (
          <div className={style.button}>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

Profile.propTypes = {
  role: PropTypes.string,
};

export default Profile;
