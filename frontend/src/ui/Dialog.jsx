import { useEffect, useRef, useState } from "react"
import Card from "./Card";

export default function Dialog({children, size, onClose, setOnCLose}) {
    const dialogRef = useRef();

    useEffect(() => {
        if(!onClose) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [onClose]);


    return !onClose && <div ref={dialogRef} onClick={(e) => {
        if(e.target === dialogRef.current) {
            setOnCLose(true);
        }
    }} className="fixed inset-0 backdrop-blur-sm bg-opacity-10 flex justify-center items-center">
        <Card size={size ?? "xl"}>
         {children}
         </Card>
        </div>
}