import Navbar from "../components/Navbar";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useRef, useState } from "react";

export default function Login() {


  const { register, handleSubmit, watch, formState: {errors} } = useForm({mode: 'onChange'});
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password");

  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState(null);



  const closeModalHandler = () => {
    setIsError(false)
  }

  const onSubmit = async (data) => {
    console.log(data)
    // fetch(`${import.meta.env.VITE_SERVER}/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => {
    //   if(response.status === 401 || response.status === 422 ) {
    //     throw new Error('Validation failed.');
    //   } else if (response.status === 200) {
    //     return response.json();
    //   } else {
    //     throw new Error('Validation failed.');
    //   }
    // })
    // .then(auth => {
    //   // console.log('Login succesfull: ', auth)
    //   localStorage.setItem('trennoSite', auth.token)
    //   localStorage.setItem('trennoId', auth.userId)
    //   localStorage.setItem('strWorkoutsDate', auth.strWorkoutsDate)
    //   // remainingTime = 4h
    //   const remainingTime = 60 * 240 * 1000;
    //   const expiryDate = new Date().getTime() + remainingTime
    //   localStorage.setItem('trennoExDate', expiryDate);
    //   navigate('/');

    //   // userAuth.token = auth.token;
    //   userAuth.handleToken(auth.token);
    //   userAuth.handleUserId(auth.userId);
    //   userAuth.handleExpiryDate(expiryDate);
    // })
    // .catch(error => {
    //   // console.log(error);
    //   setErrorData("Błędny email lub hasło.")
    //   setIsError(true)

    // })
  };

  return(
    <>
    <Navbar />
    {/* Main Content Area */}
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white relative mt-8 mx-auto max-w-md p-4 rounded-lg border ">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className=" p-8 w-full max-w-md"
        >
        <div className="flex w-full align-middle justify-center">
          <h2 className="text-2xl font-bold mb-10 text-center mx-4">Logowanie</h2> 
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"  viewBox="0 0 16 16" transform="rotate(-45)">
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
        </div>
        <div className="mb-4">
          <label 
            htmlFor="name" 
            className="block text-gray-700 mb-2"
          >
            Email
          </label>
          <input 
            {...register("email",{
              required: 'Adres email jest obowiązkowy',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Nieprawidłowy adres email",
              }},
            )}
            type="Email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        {/* {errors.email && <span className="text-slate-400 text-sm">{errors.email.message}</span>} */}
        </div>
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-gray-700 mb-2"
          >
            Hasło
          </label>
          <input 
            {...register("password",{
              required: "Hasło jest wymagane",
              minLength: {value: 8, message: "Hasło musi mieć minimum 8 znaków"}}
            )}
            type="Password" 
            id="password" 
            name="password" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>


        <div className="mt- text-sm w-full text-slate-500">
          <button className="hover:text-black"><Link to='/resetpassword'>Przypomnij hasło</Link></button>
        </div>

        
        <button 
          type="submit" 
          className="w-full mt-8 bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition duration-200"
        >
          Zaloguj
        </button>
        <div className="mt-8 w-full ">
          <button className="mx-auto w-full text-center align-middle underline underline-offset-2">
            <Link to="/register">
              Nie masz konta? Zarjestruj się
            </Link>
            </button>
        </div>
      </form>
      </div>
    </main>

    </>
  )
}