import PropTypes from "prop-types";
import { Button, FormControl, Table } from "react-bootstrap";
import style from "./List.module.css";
import { getUsers } from "../../services/roles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/auth";

const List = ({ type }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUsers();
  }, [type, users]);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Fetches users from the server and stores them in the component state.
   * @private
   * @return {Promise<void>}
   */
  /******  93493de5-9b01-436a-b631-7755385965bc  *******/
  const handleFetchUsers = async () => {
    const listUsers = await getUsers(type);
    setUsers(listUsers);
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Deletes a user from the server and updates the component state if the deletion is successful.
   * @param {{ id: number }} user The user to be deleted
   * @return {Promise<void>}
   */
  /******  2ac7cf94-225c-4ddd-9548-e3d6ab485d90  *******/
  const handleDelete = async (user) => {
    const result = await deleteUser(user.id);
    if (result.data.status == true) {
      alert("User deleted successfully");
      handleFetchUsers();
    } else {
      alert("Something went wrong");
    }
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Redirects the user to the edit page of the user being edited.
   * @param {{ id: number }} user The user to be edited
   * @return {Promise<void>}
   */
  /******  a94dcb2b-5f6a-4104-8ee6-47969de40faa  *******/
  const handleEdit = async (user) => {
    navigate(`edit/${user.id}`);
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
            {users.map((user, key) => {
              return (
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
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

List.propTypes = {
  type: PropTypes.string.isRequired,
};

export default List;
