'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import ScoreCard from "../../component/scoreCard";
import { findUser, updateUserProgress, deleteUserProgress } from "@/lib/data/user";

export default function Question2() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get('email');
    const [user, setUser] = useState({})
    const [selection, setSelection] = useState([-1,-1,-1]);
    const [showMessage, setShowMessage] = useState([false, false, false]);
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
        router.push(`/questionone?email=${encodeURIComponent(email)}`);
    }
    const handleScoreChange = (score) => {
        console.log('Score: ', score)
        setSelection(score);
    };
    const updateData = async () => {
        if (selection.includes(-1)) {
            console.log('in if')
            const showMessage = selection.map((scoreItem) => scoreItem === -1);
            console.log('Message: ', showMessage);
            setShowMessage(showMessage);
        } else {
            console.log('in else')
            try {
                const step2obj = {
                    "comfort": selection[0],
                    "looks": selection[1],
                    "price": selection[2],
                }
                const obj = {
                    step1: user[0].progress.step1,
                    step2:  step2obj
                };
                console.log('In Update: ', selection);
                const update = {progress:obj};
                updateUserProgress(email, update);
                router.push(`/endingPage?email=${encodeURIComponent(email)}`);
            } catch (error) {
                console.log("Error in updating User: ", error);
                alert('Error in Updating User');
            }
        }
    }


    return (
        <div className="sm:bg-gradient-to-r from-zinc-900 to-black bg-gradient-to-b w-full min-h-screen sm:p-5 text-center">
            <h3 className="text-white p-5">Question 2</h3>
            <h1 className="text-white text-center text-xl m-5">How important are these aspects for you?</h1>
            <div className="w-full">
                <ScoreCard onScoreChange={handleScoreChange} showMessage={showMessage}/>
            </div>
            <div className="flex justify-between sm:w-1/2 w-[80%] mx-9 sm:mx-auto">
                <div>
                    <button className="bg-[#EDB6D2] flex justify-between align-middle p-3          rounded-3xl" onClick={()=>{console.log('Back Button Triggered');
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
                    <button className="bg-white flex justify-between align-middle p-3          rounded-3xl" onClick={()=>{console.log('Button Triggered');
                    updateData(selection);}}>
                        <div className="flex justify-around">
                            <div className="p-1">
                                <p>Send</p>
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
