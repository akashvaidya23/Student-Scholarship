import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  Table,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import style from "./List.module.css";
import { getUsers } from "../../services/roles";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { deleteUser } from "../../services/auth";

const List = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobileNo: "",
    email: "",
    username: "",
    department: "",
    year: "",
    gpa: "",
    aadhaar: "",
    pan: "",
    achievements: [],
    skills: [],
    interests: [],
  });
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [panError, setPanError] = useState("");
  const [aadharError, setAadharError] = useState("");

  const achievementsRef = useRef();
  const skillsRef = useRef();
  const interestRef = useRef();

  useEffect(() => {
    handleFetchUsers();
  }, [type]);

  useEffect(() => {
    if (selectedUser) {
      setUserDetails({
        name: selectedUser.name || "",
        mobileNo: selectedUser.mobile_no || "",
        email: selectedUser.email || "",
        username: selectedUser.username || "",
        department: selectedUser.department || "",
        year: selectedUser.year || "",
        gpa: selectedUser.gpa || "",
        aadhaar: selectedUser.aadhar || "",
        pan: selectedUser.pan || "",
        achievements: selectedUser.achievements
          ? selectedUser.achievements.split(",")
          : [],
        skills: selectedUser.skills ? selectedUser.skills.split(",") : [],
        interests: selectedUser.interests
          ? selectedUser.interests.split(",")
          : [],
      });
    }
  }, [selectedUser]);

  const handleFetchUsers = async () => {
    const listUsers = await getUsers(type);
    setUsers(listUsers);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      aadhaar: value,
    }));
    setAadharError(isValidAadhaar(value) ? "" : "Invalid Aadhaar number");
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      pan: value,
    }));
    setPanError(isValidPAN(value) ? "" : "Invalid PAN number");
  };

  const isValidAadhaar = (aadhaar) => /^[2-9]{1}[0-9]{11}$/.test(aadhaar);

  const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  const addToList = (listName, ref) => {
    if (ref.current.value) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [listName]: [...prevDetails[listName], ref.current.value],
      }));
      ref.current.value = "";
      ref.current.focus();
    }
  };

  const removeFromList = (listName, index) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [listName]: prevDetails[listName].filter((_, i) => i !== index),
    }));
  };

  const handleDelete = async (user) => {
    const result = await deleteUser(user.id);
    if (result.data.status === true) {
      alert("User deleted successfully");
      handleFetchUsers();
    } else {
      alert("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMobileError("");
    setError("");

    // Check mobile number length
    if (userDetails.mobileNo.length !== 10) {
      setMobileError("Mobile Number should be 10 digits");
      return false;
    }

    // Check validity of Aadhaar
    if (userDetails.aadhaar && !isValidAadhaar(userDetails.aadhaar)) {
      setError("Invalid Aadhaar number. Must be 12 digits and start with 2-9.");
      return false;
    }

    // Check validity of PAN
    if (userDetails.pan && !isValidPAN(userDetails.pan)) {
      setError("Invalid PAN number. Format must be AAAAA1234A.");
      return false;
    }

    const updatedPayload = {
      name: userDetails.name,
      email: userDetails.email,
      username: userDetails.username,
      mobile_no: userDetails.mobileNo,
      department: userDetails.department,
      year: userDetails.year,
      gpa: userDetails.gpa,
      aadhar: userDetails.aadhaar,
      pan: userDetails.pan,
      achievements: userDetails.achievements.join(","),
      skills: userDetails.skills.join(","),
      interests: userDetails.interests.join(","),
    };

    try {
      const response = await updateUser(userDetails.id, updatedPayload);
      if (response.status === false) {
        setError(response.message);
      } else {
        alert("Profile updated successfully");
        setShowModal(false);
      }
    } catch (error) {
      setError(
        "An error occurred while updating the profile. Please try again."
      );
    }
  };

  return (
    <>
      <h3 className={style.heading}>
        List of {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
      <div className={style.main}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            float: "right",
            marginBottom: "10px",
          }}
        >
          <FormControl
            placeholder="Type to Search..."
            style={{ width: "300px", border: "1px solid black" }}
          ></FormControl>
          <Link to={`/create/?role=${type}`}>
            <Button variant="success">Add</Button>
          </Link>
        </div>
        <br />
        <Table>
          <thead>
            <tr>
              <th className={style.cell}>Sr. No.</th>
              <th className={style.cell}>Name</th>
              <th className={style.cell}>Username</th>
              <th className={style.cell}>Email</th>
              <th className={style.cell}>Mobile</th>
              <th className={style.cell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={user.id}>
                <td className={style.cell}>{key + 1}</td>
                <td className={style.cell}>{user.name}</td>
                <td className={style.cell}>{user.username}</td>
                <td className={style.cell}>{user.email}</td>
                <td className={style.cell}>{user.mobile_no}</td>
                <td className={style.cell}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      textAlign: "center",
                    }}
                  >
                    <Button variant="primary" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(user)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        className={style.customModalWidth}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {type.charAt(0).toUpperCase() + type.slice(1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleSave}>
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
                      <label htmlFor="mobile">Mobile No</label>
                      <br />
                      <Form.Control
                        type="number"
                        placeholder="Mobile No"
                        name="mobileNo"
                        id="mobile"
                        className={style.input}
                        autoComplete="off"
                        required
                        value={userDetails.mobileNo}
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
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Civil">Civil</option>
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
                      <label htmlFor="aadhaar">Aadhaar No</label>
                      <br />
                      <Form.Control
                        type="number"
                        placeholder="Aadhaar No."
                        name="aadhaar"
                        id="aadhaar"
                        className={style.input}
                        value={userDetails.aadhaar}
                        onChange={handleAadharChange}
                        autoComplete="off"
                        required
                        minLength={12}
                        size={12}
                        maxLength={12}
                      />
                      {aadharError && (
                        <span className="error">{aadharError}</span>
                      )}
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
                      <label htmlFor="achievements">Achievements</label>
                      <br />
                      <Form.Control
                        type="text"
                        placeholder="Achievements"
                        name="achievements"
                        id="achievements"
                        onBlur={() =>
                          addToList("achievements", achievementsRef)
                        }
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
                        onBlur={() => addToList("skills", skillsRef)}
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
                        onBlur={() => addToList("interests", interestRef)}
                      />
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <ul>
                      {userDetails.achievements.length > 0 &&
                        userDetails.achievements.map((achievement, index) => (
                          <li key={index}>
                            {achievement}{" "}
                            <button
                              type="button"
                              onClick={() =>
                                removeFromList("achievements", index)
                              }
                            >
                              X
                            </button>
                          </li>
                        ))}
                    </ul>
                  </Col>

                  <Col>
                    <ul>
                      {userDetails.skills.length > 0 &&
                        userDetails.skills.map((skill, index) => (
                          <li key={index}>
                            {skill}{" "}
                            <button
                              type="button"
                              onClick={() => removeFromList("skills", index)}
                            >
                              X
                            </button>
                          </li>
                        ))}
                    </ul>
                  </Col>

                  <Col>
                    <ul>
                      {userDetails.interests.length > 0 &&
                        userDetails.interests.map((interest, index) => (
                          <li key={index}>
                            {interest}{" "}
                            <button
                              type="button"
                              onClick={() => removeFromList("interests", index)}
                            >
                              X
                            </button>
                          </li>
                        ))}
                    </ul>
                  </Col>
                </Row>
              </Container>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

List.propTypes = {
  type: PropTypes.string.isRequired,
};

export default List;
