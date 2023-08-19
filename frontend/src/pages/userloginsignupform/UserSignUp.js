import React,{ useState} from 'react'
import {AiFillMail} from 'react-icons/ai'
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const UserSignUp = () => {
  const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userrole, setUserrole] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password.length < 3) {
            toast.error('Password must contain at least 3 characters');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_PORT}api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    userrole,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('jwttoken', data.jwtoken);
                localStorage.setItem('token', true);
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('role', data.data.role);
                navigate('/Dashboard');
                toast.success('Registration Successful');
            } else if (response.status === 400) {
                const data = await response.json();
                toast.error(data.message);
            } else {
                toast.error('An error occurred during registration');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred during registration');
        }
    };



 

  return (
   <>
   <title>Sign Up</title>

 
 <div className='px-3 pb-10 pt-16 h-screen' style={{backgroundColor:'#F2F3F8'}}>

<div className='max-w-[1000px] mx-auto my-10 border rounded-lg '>

<div className='pt-8 pb-12 px-5 lg:pr-12 bg-white'>
<form onSubmit={handleRegistration}>
  <h1 className='font-bold text-2xl md:text-4xl my-4'>SignUp</h1>
<div className='relative'>
<RiUser3Fill className='absolute top-5'/>
  <input className='border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full' type='text' placeholder='Name*' value={name}
    onChange={(e)=>setName(e.target.value)} required></input>
</div>

<div className='relative'>
<AiFillMail className='absolute top-5'/>
  <input className='border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full' type='email' placeholder='Email*' value={email}  onChange={(e)=>setEmail(e.target.value)} required></input>
</div>

<div className='relative'>
<RiLockPasswordFill className='absolute top-5'/>
  <input className='border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full' type='password' placeholder='Password*' value={password}
   onChange={(e)=>setPassword(e.target.value)} required></input>
</div>
<div className='relative'>
    <BiUserCircle className='absolute top-5'/>
    <select
      className='border-b focus:outline-none border-gray-600 px-6 py-2 my-2 w-full'
      value={userrole}
      onChange={(e) => setUserrole(e.target.value)}
      type='text'
      required
    >
      <option value='' disabled>Select User Role*</option>
      <option value='candidate'>candidate</option>
      <option value='voter'>voter</option>
    </select>
  </div>
<button className='my-3 bg-gray-900 text-white px-8 py-2.5 font-bold w-full rounded-lg' >Sign Up</button>
<p className='mb-5 mt-2'>Have an Account? <span className='text-gray-900 font-bold text-sm cursor-pointer'  onClick={()=>navigate('/')}>Login Here</span></p>
</form>
</div>

</div>
</div> 

   </>
  )
}

export default UserSignUp