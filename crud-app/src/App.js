import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [EmpName, SetEmpName] = useState("");

  const [EmpEmail, SetEmpEmail] = useState("");

  const [EmpDesination, SetEmpDesination] = useState("");

  const [Edit, SetEdit] = useState(false);

  const [User, Setuser] = useState([]);

  const [updateIndex, setUpdateIndex] = useState();

  const [nameError, SetnameError] = useState();

  const [emailerror, setemailerror] = useState();

  const [desinationerror, Setdesinationerror] = useState();

  const EmpNameHandler = (event) => {
    SetEmpName(event.target.value);
  };

  const EmpEmailHandler = (event) => {
    SetEmpEmail(event.target.value);
  };

  const EmpDesinationHandler = (event) => {
    SetEmpDesination(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const Adduser = (e) => {
    if (EmpName == "" && EmpEmail == "" && EmpDesination == "") {
      SetnameError("this feild is required");
      setemailerror("this feild is required");
      Setdesinationerror("this feild is required");
    } else if (EmpName == "") {
      SetnameError("this feild is requried");
    } else if (EmpEmail == "" || !EmpEmail.includes("@")) {
      setemailerror("something is missing");
    } else if (EmpDesination == "") {
      Setdesinationerror("this feild is required");
    } else {
      const Users = {
        EmpName,
        EmpEmail,
        EmpDesination,
      };

      Setuser([...User, Users]);
      SetEmpName("");
      SetEmpEmail("");
      SetEmpDesination("");
    }

    // User.push(Users);
  };

  const EditHandler = (index) => {
    const Myuser = User[index];
    SetEmpName(Myuser.EmpName);
    SetEmpEmail(Myuser.EmpEmail);
    SetEmpDesination(Myuser.EmpDesination);
    SetEdit(true);
    setUpdateIndex(index);
  };

  // const DeleteUser = (index) => {
  //   let newArray=User
  //   newArray.splice(index,1)
  //    Setuser([...User,newArray])

  //    console.log(index,"index");
  //    console.log(User,"user")
  //    console.log(newArray,"newArray")
  // }

  const DeleteUser = (index) => {
    const remove = window.confirm("Do you really want to delete this");

    if (!remove) {
      return;
    }

    let newArray = User;

    newArray.splice(index, 1);

    Setuser([...newArray]);
  };

  // const Updateuser = () => {
  //   // updateIndex
  //   const Users = {
  //     EmpName,
  //     EmpEmail,
  //     EmpDesination,
  //   };

  //   SetEdit(false);
  //   let newArray = User;
  //   newArray[updateIndex] = Users;
  //   Setuser(newArray);
  //   SetEmpName("");
  //   SetEmpEmail("");
  //   SetEmpDesination("");
  // };

  const Updateuser = () => {
    let updateuser = [...User];

    let editedData = { EmpName, EmpEmail, EmpDesination };

    updateuser[updateIndex] = editedData;
    Setuser(updateuser);
  };

  return (
    <div className="App">
      <h1>React CRUD-APP</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Emp_Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={EmpName}
                  placeholder="Enter the name"
                  onChange={EmpNameHandler}
                  onFocus={() => SetnameError("")}
                  // onBlur={ValidationEmpError}
                />
                <p style={{ color: "red" }}>{nameError}</p>
              </div>

              <div className="form-group">
                <label htmlFor="">Emp_Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={EmpEmail}
                  onFocus={() => setemailerror("")}
                  placeholder="Enter vaild E-mail"
                  onChange={EmpEmailHandler}
                />
                <p style={{ color: "red" }}>{emailerror}</p>
              </div>

              <div className="form-group">
                <label htmlFor="">Emp_Desination</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Desination"
                  value={EmpDesination}
                  onChange={EmpDesinationHandler}
                  onFocus={() => Setdesinationerror("")}
                />
                <p style={{ color: "red" }}>{desinationerror}</p>
              </div>
              {Edit && Edit == false && (
                <button
                  className="btn btn-success form-control mt-2"
                  onClick={Adduser}
                >
                  Add
                </button>
              )}
              {Edit == true && (
                <button
                  className="btn btn-success form-control mt-2 "
                  onClick={Updateuser}
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <table className="table table-borderd mt-5">
        <thead>
          <tr>
            <th>Emp_Name</th>
            <th>Emp_Email</th>
            <th>Emp_Desination</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {User.map((User, index) => {
            return (
              <tr key={index}>
                <td>{User.EmpName}</td>
                <td>{User.EmpEmail}</td>
                <td>{User.EmpDesination}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => EditHandler(index)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      DeleteUser(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
