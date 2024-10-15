import Navbar from "../components/Navbar";


import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useRef, useState } from "react";


export default function Register() {

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
    // fetch(`${import.meta.env.VITE_SERVER}/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => {
    //   if(response.status === 422 ) {
    //     // state with proper message
        
    //     throw new Error(`Zweryfikuj adres email oraz hasło czy są poprawne, 
    //       sprawdź email czy link weryfikacyjny nie został już wysłany, 
    //       lub spróbuj ponownie później.`);
    //   }
    //   return response.json();
    // })
    // .then(auth => {
    //   // HANDLE AFTER REGISTER
    //   navigate('/login');
    //   console.clear();
    //   })
    //   .catch(error => {
    //     setErrorData(error.message)
    //     setIsError(true)
    //     console.clear();

    // })
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="relative bg-white mt-8 mx-auto max-w-md p-4 rounded-lg border">
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className=" p-8 w-full max-w-md"
      >
        <div className="flex w-full align-middle justify-center">
          <h2 className="text-2xl font-bold mb-10 text-center mx-4">Rejestracja</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>

        </div>
        <div className="mb-4">
          <label 
            htmlFor="name" 
            className="block text-gray-700 mb-2"
          >
            Email
          </label>
          <input {...register("email",{
            required: 'Adres email jest obowiązkowy',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Nieprawidłowy adres email",
              }},
            )}
            type="Email" 
            id="email" 
            name="email" 
            // value={formData.email} 
            // onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.email && <span className="text-slate-400 text-sm">{errors.email.message}</span>}
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
            // value={formData.password} 
            // onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        {errors.password && <span className="text-slate-400 text-sm">{errors.password.message}</span>}
        </div>
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-gray-700 mb-2"
          >
            Powtórz hasło
          </label>
          <input {...register("password2",{
            required: "Potwierdzenie hasła jest wymagane",
            validate: (value) => {
              if(value != watch("password")) {
                
                return "Hasła nie są takie same"
              } }
            })}
            type="Password" 
            id="password2" 
            name="password2" 
            // value={formData.password2} 
            // onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        {errors.password2 && <span className="text-slate-400 text-sm">{errors.password2.message}</span>}
        </div>

        
        <button 
          type="submit" 
          className="w-full mt-8 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Zarejestruj
        </button>

      </form>
      </div>
      </main>
    </>
  )
}