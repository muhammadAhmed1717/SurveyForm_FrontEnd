'use client'
import React , {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import BackgroundSection from '../../component/background'
import { findUser } from '../../lib/data/user'
import { useSearchParams } from 'next/navigation'
export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get('email');
    const [user, setUser] = useState();
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
        findByEmail();
    },[])
    const goBack = () => {
        router.push(`/questionone?email=${encodeURIComponent(email)}`);
    }
    const goHome = () => {
        router.push(`/?email=${encodeURIComponent(email)}`);
    }
    return (
        <div className='sm:mt-0 mt-64'>
            <div className='text-white'>
                <h1 className='font-extrabold text-6xl sm:text-7xl'>Thank you</h1>
                <p className='text-lg text-right -mt-9'>for your feedback</p>
            </div>
            <div className="flex justify-between my-5">
                <div>
                    <button className="bg-[#EDB6D2] flex justify-between align-middle p-3 rounded-3xl" onClick={()=>{console.log('Back Button Triggered');
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
                    <button className="bg-white flex justify-between align-middle p-3    rounded-3xl" onClick={()=>{console.log('Button Triggered');
                    goHome();}}>
                        <div className="flex justify-around">
                            <div className="p-1">
                                <p>Back to Home</p>
                            </div>
                            <div className="p-2">
                                <img src="/assets/NextIcon.svg" alt="Logo" width={10} height={10} />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
