'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import BackgroundSection from "../../component/background";
import { findUser, updateUserProgress } from "@/lib/data/user";
import ShoeCard from "../../component/shoeCard";

export default function Question1() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get('email');
    const [user, setUser] = useState({})
    const [selection, setSelection] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const findByEmail = async () => {
        try {
            const data = await findUser(email);
            if(data){
                setUser(data);
                console.log('Data: ', data);
            }
        } catch (error) {
            console.log('Error in Finding User By Email: ', error);
        }
    }

    useEffect(()=>{
        if(!email){
            router.push('/');
        }
        findByEmail();
    },[])

    const goBack = () => {
        router.push(`/?email=${encodeURIComponent(email)}`);
    }
    const updateData = (temp) => {
        if(isSelected){
            try {
                console.log('In Update: ', temp);
                const obj = {step1:temp};
                const update = {progress:obj};
                updateUserProgress(email, update);
                router.push(`/questiontwo?email=${encodeURIComponent(email)}`)
            } catch (error) {
                console.log("Error in updating User: ", error);
                alert('Error in Updating User');
            }
        }
        else {
            console.log('setting hidden true')
            setIsHidden(false);
        }
    }


    return (
        <div className="sm:bg-gradient-to-r from-zinc-900 to-black bg-gradient-to-b w-full min-h-screen sm:p-9 text-center">
            <h3 className="text-white p-9">Question 1</h3>
            <h1 className="text-white text-center text-xl m-5">What is your preferred choice?</h1>
            <div className="flex sm:m-0 m-9">
                <div className="w-1/2 bg-[#6D6D6D] m-1 rounded-lg relative">
                    <button onClick={()=>{
                        setSelection('Nike Orange')
                        setIsSelected(true);
                        console.log('Selection: ', selection);
                        }}>
                        <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-10">
                            <div className="bg-black h-7 w-7 rounded-full relative">
                                <div className={`${selection === 'Nike Orange' ? 'bg-green-700' : 'bg-white'} w-5 h-5 rounded-full absolute top-1 left-1`}></div>
                            </div>
                        </div>
                        <ShoeCard shoeName={"Nike Orange"} shoeImage="assets/shoe2.png"/>
                    </button>
                </div>
                <div className="w-1/2  bg-[#6D6D6D] m-1 rounded-lg relative">
                    <button onClick={()=>{
                        setSelection('Nike Black');
                        setIsSelected(true);
                        console.log('Selection: ', selection);
                    }}>
                        <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-10">
                            <div className="bg-black h-7 w-7 rounded-full relative">
                                <div className={`${selection === 'Nike Black' ? 'bg-green-700' : 'bg-white'} w-5 h-5 rounded-full absolute top-1 left-1`}></div>
                            </div>
                        </div>
                        <ShoeCard shoeName={"Nike Black"} shoeImage="assets\shoe1.png"/>
                    </button>
                </div>
            </div>
            <div className={`${isHidden ? 'hidden' : 'block' } text-center text-red-700 my-2`}>Please Select One</div>
            <div className="flex justify-between sm:m-1 m-3">
                <div>
                    <button className="bg-[#EDB6D2] flex justify-between align-middle p-3          rounded-lg" onClick={()=>{console.log('Back Button Triggered');
                        goBack();}}>
                        <div className="flex">
                            <div className="p-2">
                                <img src="/assets/BackIcon.svg" alt="Logo" width={10} height={10} />
                            </div>
                            <div className="p-1">
                                <p>Back</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="bg-[#BBE94A] flex justify-between align-middle p-3          rounded-lg" onClick={()=>{console.log('Button Triggered');
                    updateData(selection);}}>
                        <div className="flex justify-around">
                            <div className="p-1">
                                <p>Next</p>
                            </div>
                            <div className="p-2">
                                <img src="/assets/NextIcon.svg" alt="Logo" width={10} height={10} />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );    
}   
