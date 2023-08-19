import React, { useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiIsLoading, setApiIsLoading] = useState(false);

  const handleLogin = async (e) => {
      e.preventDefault();
      setApiIsLoading(true);

      try {
          const response = await fetch(
              `${process.env.REACT_APP_API_PORT}api/auth/login`,
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      email,
                      password,
                  }),
              }
          );

          const data = await response.json();
          setApiIsLoading(false);

          if (response.status === 200) {
              localStorage.setItem('jwttoken', data.jwtoken);
              localStorage.setItem('token', true);
              localStorage.setItem('username', data.data.username);
              localStorage.setItem('role', data.data.role);
              console.log(data.message);
              navigate('/Dashboard');
          } else {
              navigate('/');
              toast.error(data.message);
          }
      } catch (error) {
          console.error('Error during login:', error);
          setApiIsLoading(false);
          toast.error('An error occurred during login');
      }
  };

  return (
    <>
      <title>Login</title>
  {

    apiIsLoading ? <Loader/> :''
  }
     
      {/* <ModalComponent/> */}
      
      <div className="px-3 pb-10 pt-16 h-screen" style={{ backgroundColor: "#F2F3F8" }}>
        <div className="max-w-[1000px] mx-auto my-10 border rounded-lg ">
        
           
            <div className="pt-16 pb-12 px-5 lg:pr-12 bg-white">
              <form onSubmit={handleLogin}>
                <h1 className="font-bold text-2xl md:text-4xl my-4">Log In</h1>

                <div className="relative">
                  <AiFillMail className="absolute top-5" />
                  <input
                    className="border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full"
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                </div>

                <div className="relative">
                  <RiLockPasswordFill className="absolute top-5" />
                  <input
                    className="border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full"
                    type="password"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </div>
                <button
                style={{background: 'linear-gradient(90deg, rgba(83,76,191,1) 0%, rgba(163,70,193,1) 61%, rgba(255,102,0,1) 100%)',color:'white'}}
                  type="submit"
                  className="my-3 bg-gray-900 text-white px-8 py-2.5 font-bold w-full rounded-lg"
                >
                  LOGIN
                </button>
              
                <p className="mb-5 mt-2">
                  {" "}
                  Need an Account?{" "}
                  <span
                    className="text-gray-900 font-bold text-sm cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Signup Here
                  </span>
                </p>
              </form>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default UserLogin;
