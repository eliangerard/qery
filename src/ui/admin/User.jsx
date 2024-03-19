const User = ({ user }) => {
  return (
    <div  className="w-1/2 h-60 p-4">
      <div className="w-full h-full flex">
        <div className="bg-accent-500 w-2/3">
          <p className="text-xl py-1 bg-ab-500 w-full text-white">ID: {user._id}</p>
          <p className="text-xl py-1 text-white">Nombre: {user.companyName}</p>
          <p className="text-xl py-1 text-white">Email: {user.email}</p>
          <p className="text-xl py-1 text-white">Teléfono: {user?.phone}</p>
          <p className="text-xl py-1 text-white">Horario: {user.schedule}</p>
        </div>
        <img className="h-full w-1/3 object-cover" src={user.picture} alt="" />
      </div>
    </div>
  );
};

export default User;
