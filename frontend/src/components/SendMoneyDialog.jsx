import Dialog from "../ui/Dialog";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import Button from "../ui/Button";
import { useRef } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { BalanceAtom } from "../store/atoms/BalanceAtom";

export default function SendMoneyDialog({id, name, code, onClose, setOnClose}) {
    const amountRef = useRef();
    const setBalance = useSetRecoilState(BalanceAtom);
    function initiateTransfer() {
        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount: Number(amountRef.current.value)
          },
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }).then(() => {
            setBalance(balance => balance - amountRef.current.value);
            setOnClose(true);
        })
    }

    return <Dialog onClose={onClose} setOnCLose={setOnClose}>
            <Heading name={"Send Money"}></Heading>
            <div className="flex flex-col gap-3 mt-5">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full w-16 h-16 border flex justify-center items-center bg-[#26c35d] text-2xl font-medium text-white">
                        <div>{code}</div>
                    </div>
                    <div className="text-black font-bold text-3xl">{name}</div>
                </div>
                <InputBox type={"text"} label={"Amount (in Rs)"} placeholder={"Enter Amount"} ref={amountRef}  />
                <Button name={"Initiate Transfer"} varient={"green"} onClickFn={initiateTransfer}/>
            </div>
    </Dialog>
}