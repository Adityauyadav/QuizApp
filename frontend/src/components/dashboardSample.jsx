import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen text-black font-instrument">
      <h1 className="text-3xl font-bold text-black">Welcome, authenticated user!</h1>
      <button className="border p-1 px-2 m-2" onClick={()=>{
        localStorage.removeItem("token");
        navigate('/')
      }}>Log Out</button>
    </div>
  );
}

export default Dashboard;