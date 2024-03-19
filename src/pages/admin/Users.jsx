import { useState } from "react";
import { useEffect } from "react";
import User from "../../ui/admin/User";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.qery.me/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  });

  return (
    <div>
      <header className="w-full py-8 px-12 bg-b-500">
        <h1 className="font-bold text-4xl text-white">Empresas registradas</h1>
      </header>
      <div className="w-full flex justify-center min-h-full">
        <div className="flex flex-wrap w-4/5">
          {users.map((user, i) => (
            <User key={i} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
