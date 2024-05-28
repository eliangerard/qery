import { useNavigate } from "react-router-dom";
import { server } from "../../pages/util/server";
import { Union } from "../Icons/Union";
import { Slide } from "../Slide";
import { useState } from "react";

const User = ({ user }) => {

  const navigate = useNavigate();
  const [active, setActive] = useState(user.admin);

  return (
    <div className="w-full h-fit p-4">
      <p className="text-xl truncate w-fit italic text-gray-500">{user._id}</p>
      <div className="w-full">
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="bg-accent-500 flex flex-col justify-between w-full md:w-2/3">
            <div className={`flex items-center p-2 ${user.subscribed ? 'bg-green-500' : 'bg-ab-500'}`}>
              {user.subscribed && <Union className="h-4 mr-2 fill-white" />}
              <p className="text-xl truncate text-white font-semibold">{user.companyName}</p>
            </div>
            <p className="text-xl p-2 truncate text-white">{user.email ? user.email : "Sin email"}</p>
            <p className="text-xl p-2 truncate text-white">{user.phone ? user.phone : "Sin teléfono"}</p>
            <p className="text-xl p-2 truncate text-white">{user?.schedule?.length > 0 ? "Horario: " : "Sin horario"}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-white text-xl p-2">Admin</p>
              <Slide active={active} toggle={(active) => {
                fetch(`${server}/users/admin/${user._id}/`, {
                  method: "PATCH",
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  },
                  body: JSON.stringify({ admin: active })
                })
                  .then(res => {
                    if (res.status === 401) {
                      navigate("/");
                    } else {
                      return res.json();
                    }
                  })
                  .then(res => {
                    if (res.error) return console.error(res.error);
                    console.log(res);
                  })
              }} />
            </div>
          </div>
          <div className="md:w-1/3 grow overflow-hidden">
            <img className="h-1/2 w-full md:h-full object-cover" src={user.picture ? user.picture.substring(0, user?.picture.indexOf("=")) : "https://i.stack.imgur.com/l60Hf.png"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
