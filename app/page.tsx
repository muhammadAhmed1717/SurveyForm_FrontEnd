'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import BackgroundSection from "../component/background";
import { addUserProgress, findUser } from "@/lib/data/user";
import "./globals.css";


export default function Index() {
  const [email, setEmail] = useState('');
  const router = useRouter();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("Email: ", e.target.value);
  };
  const addData = async () => {
    try{
      const user = await findUser(email);
      if(user.length != 0){
        console.log('User Found', user)
        router.push(`/questionone?email=${encodeURIComponent(email)}`)
      }else{
        console.log('User Not Found')
        addUserProgress(email);
        router.push(`/questionone?email=${encodeURIComponent(email)}`)
      }
    }catch(error){
      console.log('error in adding email: ', error)
    }
  }

  return (
    <div>
      <div className="text-left">
        <h1 className="text-white text-center text-5xl">Questionnaire</h1>
        <div className="bg-[#EDB6D2] rounded-2xl p-3">
          <h2 className="font-bold">Welcome!</h2>
          <p>We're excited to hear your thoughts, ideas, and insights. Don't worry about right or wrong answers—just speak from the heart. Your genuine feedback is invaluable to us!</p>
        </div>
        <div className="text-white py-3">
          <h3 className="font-bold py-3">Email</h3>
          <input 
            className="w-full h-9 rounded-lg p-3 text-black"
            placeholder="Enter Your Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button className="bg-[#BBE94A] flex justify-between align-middle p-3 rounded-lg w-full" onClick={()=>{console.log('Button Triggered');
          addData();}}>
            <div>
              <p>Start Survey</p>
            </div>
            <div>
              <img src="/assets/NextIcon.svg" alt="Logo" width={10} height={10} />
            </div>
        </button>
      </div>
    </div>
  );
}
