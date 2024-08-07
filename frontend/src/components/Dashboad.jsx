import {User} from 'lucide-react';
import Search from '../ui/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SendMoneyDialog from './SendMoneyDialog';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/user';
import { BalanceAtom } from '../store/atoms/BalanceAtom';

export default function Dashboad() {

    const userDetails = useUser() ;
    const navigate = useNavigate();

    if(userDetails) {
        return <>
        <DashBoardHeader userDetails={userDetails} />
        <RecoilRoot>
        <MainDashboard />
        </RecoilRoot>
        </>
    } else {
        navigate("/");
    }
    
}

function DashBoardHeader({userDetails}) {
    const navigate = useNavigate();

    return <div className="bg-white w-full p-3 flex justify-between">
        <div className="text-black text-2xl font-medium font-sans">
            QuickPay
        </div>
        <div className="flex gap-3 justify-center items-center">
            <div className="text-black text-xl font-medium">Hello, {userDetails.userName}</div>
            <div className="rounded-full w-12 h-12 border border-black flex justify-center items-center bg-white">
                <User className="w-8 h-8"></User>
            </div>
            <button className="w-15 h-10 text-black bg-white text-lg font-bold" onClick={() => {
                localStorage.removeItem("token");
                navigate("/")
            }}>Logout</button>
        </div>
    </div>
}

function MainDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [balance, setBalance] = useRecoilState(BalanceAtom);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/account', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` ,
            }
        }).then(response => {
            setBalance(response.data.balance);
        }
        ) 
    }, []);

    useEffect(() => {

        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` ,
            }
        }).then((response) => {
            const users = response.data.users;
            setSearchResults(users.map(user => {
                return {
                    id: user.userId,
                    code: user.firstName.toUpperCase()[0],
                    name: user.firstName
                }
            }))
        })
        
    }, [searchQuery])


    return <div className='bg-white border border-[rgba(0,0,0,0.1)] py-5 p-3'>
        <span className='text-black text-xl font-medium'>Your wallet:</span>&nbsp; &nbsp;
        <span className='text-black text-3xl font-medium'>&#8377;{balance}</span>
        <Search label={"Users"} placeholder={"Search users..."} setSearchQueryState={setSearchQuery} resultsState={searchResults} DisplaySearchResultsTemplate={DisplaySearchResults} noResultsLabel={"No Users found"}/>
    </div>
}

function DisplaySearchResults({id, code, name}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [onClose, setOnClose] = useState(false);

    useEffect(() => {
        setOpenDialog(false);
        setOnClose(false);
    }, [onClose])
    
    return <div className="bg-white p-3 flex justify-between items-center">
        <div className='flex justify-center items-center gap-5'>
            <div className="rounded-full w-12 h-12 border border-black flex justify-center items-center bg-[#f4f4f5] text-xl font-medium">
                <div>{code}</div>
            </div>
            <div className="text-black font-bold text-lg">{name}</div>
        </div>
        <Button name={"Send Money"} size={"sm"} onClickFn={() => setOpenDialog(true)} />
        {openDialog ? <SendMoneyDialog id={id} name={name} code={code} onClose={onClose} setOnClose={setOnClose} /> : <></>}
    </div>
}