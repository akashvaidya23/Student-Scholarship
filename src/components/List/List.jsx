import PropTypes from "prop-types";
import {
  Button,
  Table,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Badge,
  FloatingLabel,
} from "react-bootstrap";
import style from "./List.module.css";
import { getUsers } from "../../services/roles";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { deleteUser, registerUser, updateUser } from "../../services/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";

const List = ({ type }) => {
  const notify = (message) => {
    return toast(message);
  };
  const [toastColor, setToastColor] = useState("");
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
    caste: "",
    category: "",
    gender: "",
    specially_abled: "",
    family_income: "",
  });
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [panError, setPanError] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [action, setAction] = useState("");

  const achievementsRef = useRef();

  useEffect(() => {
    handleFetchUsers();
  }, [type]);

  useEffect(() => {
    if (selectedUser) {
      setUserDetails({
        id: selectedUser.id || "",
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
        caste: selectedUser.caste || "",
        category: selectedUser.category || "",
        gender: selectedUser.gender || "",
        specially_abled: selectedUser.specially_abled || "",
        family_income: selectedUser.family_income || "",
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

  const [active, setActive] = useState("off");
  const handleChangeVerify = (e) => {
    const verify = e.target.value;
    console.log(verify);
    verify == "1" ? setActive("verified") : setActive("not verified");
  };

  const handleDelete = async (user) => {
    // setToastColor("red");
    const result = await deleteUser(user.id);
    if (result.data.status === true) {
      handleFetchUsers();
      toast.danger("User deleted successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.danger("Something went wrong.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleEdit = (action, user) => {
    setAction(action);
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
      role: type,
    };
    console.log(userDetails.id);
    // return false;
    try {
      let response = null;
      if (!userDetails.id) {
        response = await registerUser(updatedPayload);
      } else {
        response = await updateUser(userDetails.id, updatedPayload);
      }
      if (response.status === false) {
        setError(response.message);
      } else {
        toast.success(`User ${action}ed successfully`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setShowModal(false);
        handleFetchUsers();
      }
    } catch (error) {
      console.log(error);
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
          <Button onClick={() => handleEdit("Add", {})} variant="success">
            Add
          </Button>
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
                    <Button
                      variant="primary"
                      onClick={() => handleEdit("Edit", user)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(user)}>
                      Delete
                    </Button>
                    {user.verified == 1 ? (
                      <Button variant="success">Verified</Button>
                    ) : (
                      <Button variant="info">Verify Now</Button>
                    )}
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
            {action} {type.charAt(0).toUpperCase() + type.slice(1)}
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
                  {type === "student" && (
                    <>
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
                    </>
                  )}
                  {type === "teacher" && (
                    <>
                      <Col></Col>
                      <Col></Col>
                    </>
                  )}
                </Row>
                <br />
                {type === "student" && (
                  <>
                    <Row>
                      <Col>
                        <div>
                          <label htmlFor="gpa">GPA</label>
                          <br />
                          <Form.Control
                            type="number"
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
                          {panError && (
                            <span className="error">{panError}</span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <div>
                          <label htmlFor="caste">Caste</label>
                          <br />
                          <Form.Control
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
                            <option
                              selected={userDetails.gender == "male"}
                              value="male"
                            >
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
                            <option
                              selected={userDetails.category == "obc"}
                              value="obc"
                            >
                              OBC
                            </option>
                            <option
                              selected={userDetails.category == "sc"}
                              value="sc"
                            >
                              SC
                            </option>
                            <option
                              selected={userDetails.category == "st"}
                              value="st"
                            >
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
                          <label htmlFor="specially_abled">
                            Are you Specially Abled
                          </label>
                          <br />
                          <Form.Select
                            aria-label="Select specially abled"
                            className={style.input}
                            name="specially_abled"
                            onChange={handleChange}
                          >
                            <option value="">Are you specially abled</option>
                            <option
                              selected={userDetails.specially_abled == 1}
                              value="1"
                            >
                              Yes
                            </option>
                            <option
                              selected={userDetails.specially_abled == 0}
                              value="0"
                            >
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
                              selected={
                                userDetails.family_income === "1L - 2.5L"
                              }
                              value="1L-2.5L"
                            >
                              1 Lakh to 2.5 Lakh
                            </option>
                            <option
                              selected={
                                userDetails.family_income === "2.5L - 8L"
                              }
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
                    </Row>
                    <br />
                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <ul>
                          {userDetails.achievements.length > 0 &&
                            userDetails.achievements.map(
                              (achievement, index) => (
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
                              )
                            )}
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="verify_changes">Verify Changes?</label>
                        <br />
                        <Form.Check
                          inline
                          label="Accept"
                          name="verify"
                          type="radio"
                          value="1"
                          selected={active == "verified"}
                          onChange={handleChangeVerify}
                        />
                        <Form.Check
                          inline
                          label="Reject"
                          name="verify"
                          type="radio"
                          value="0"
                          selected={active == "not verified"}
                          onChange={handleChangeVerify}
                        />
                      </Col>
                      <Col>
                        {active == "not verified" && (
                          <>
                            <label htmlFor="comments">Comments</label>
                            <Form.Control
                              type="text"
                              placeholder="Caste"
                              name="caste"
                              id="caste"
                              value={userDetails.comment}
                              onChange={handleChange}
                              className={style.input}
                              autoComplete="off"
                            />
                          </>
                        )}
                      </Col>
                      <Col></Col>
                    </Row>
                    <br />
                  </>
                )}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

List.propTypes = {
  type: PropTypes.string.isRequired,
};

export default List;
