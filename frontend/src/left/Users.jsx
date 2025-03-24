import React from "react";
import User from "./User";
import userGetAllUsers from "../context/userGetAllUsers";

function Users() {
  const [alluser, loading] = userGetAllUsers();
  console.log(alluser);

  return (
    <div
      style={{ maxHeight: "calc(84vh - 5vh" }}
      className="py-2 overflow-y-auto"
    >
      {alluser.map((user, index) => {
        return <User key={index} user={user} />;
      })}
     
    </div>
  );
}

export default Users;
