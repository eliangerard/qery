import { useState } from "react";
import { useEffect } from "react";
import User from "../../ui/admin/User";
import { Logo } from "../../ui/Icons/Logo";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.qery.me/users/all")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  });

  return (
    <div>
      <header className="w-full flex items-center h-24 bg-b-500">
        <button className="h-full" onClick={() => navigate("/")}>
          <Logo className="h-full" />
        </button>
        <h1 className="font-bold text-4xl ml-8 text-white">Empresas registradas</h1>
      </header><div className="w-full p-4">
        <h2 className="text-center">Mostrando {users.length} usuarios</h2>
        <div className="w-full flex justify-center min-h-full">
          <div className="flex flex-wrap w-full md:w-4/5">
            {users.map((user, i) => (
              <User key={i} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
