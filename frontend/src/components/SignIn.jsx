import { useRef } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import FooterQuestion from "../ui/FooterQuestion";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import SubHeader from "../ui/SubHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/user";

export default function SignIn() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const userDetails = useUser();
    const signInFields = [
        {
            type: "text",
            label: "Username",
            placeholder: "JohnDoe",
            ref: userNameRef
        },
        {
            type: "password",
            label: "Password",
            placeholder: "",
            ref: passwordRef
        }
    ];

    function userSignIn() {
        axios.post('http://localhost:3000/api/v1/user/signin', {
            userName:  userNameRef.current.value,
            password: passwordRef.current.value
        }).then(response => {
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        })
    }

    if(userDetails) {
        navigate("/dashboard");
    } else {
        return <>
        <div className="w-full h-screen bg-[#C0C0C0] flex justify-center items-center">
            <Card>
                <Heading name={"Sign In"}></Heading>
                <SubHeader subHeading={"Enter your credentials to access your account"}></SubHeader>
                {signInFields.map((field, index) => <InputBox key={index} label={field.label} type={field.type} placeholder={field.placeholder} ref={field.ref}/>)}
                <Button name={"Sign In"} onClickFn={userSignIn}/>
                <FooterQuestion question={"Don't have an account?"} name={"Sign Up"} toPath={"/"}></FooterQuestion>
            </Card>
        </div>
        </>
    }
}