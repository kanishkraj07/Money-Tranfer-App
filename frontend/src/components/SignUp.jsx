import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import FooterQuestion from "../ui/FooterQuestion";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import SubHeader from "../ui/SubHeader";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import useUser from "../hooks/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
const BACKEND_URL = 'http://localhost:3000/api/v1';

export default function SignUp() {

    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const userNameRef = useRef('');
    const passwordRef = useRef('');
    const userDetails = useUser();
    const navigate = useNavigate();

    const authData = [
        {icon: faGoogle, text: 'Sign in with Google', provider: 'google'}
        , {icon: faGithub, text: 'Sign in with Github', provider: 'github'}
        , {icon: faFacebook, text: 'Sign in with Facebook', provider: 'facebook'}]

    const inputFields = [
        {
            label: 'First Name',
            type: 'text',
            placeholder: 'John',
            ref: firstNameRef
        },
        {
            label: 'Last Name',
            type: 'text',
            placeholder: 'Doe',
            ref: lastNameRef
        },
        {
            label: 'Username',
            type: 'text',
            placeholder: 'johndoe',
            ref: userNameRef
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: '',
            ref: passwordRef
        }
    ];

    const startAuth = (provider) => { window.open(`${BACKEND_URL}/auth/${provider}`, '_self');}

    function performSignUp() {
        axios.post("http://localhost:3000/api/v1/user/signup", {
            userName: userNameRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value,
        }).then((response) => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate("/dashboard");
        })
    }

    if(!userDetails) {
        return <>
        <div className="w-full h-screen bg-[#C0C0C0] flex justify-center items-center gap-20">
            <Card>
                <Heading name={"Sign Up"}></Heading>
                <SubHeader subHeading={"Enter your information to create an account"}></SubHeader>
                {inputFields.map(field => <InputBox key={field.label} type={field.type} label={field.label} placeholder={field.placeholder} ref={field.ref}></InputBox>)}
                <Button onClickFn={performSignUp} name={"Sign up"}></Button>
                <FooterQuestion question={"Already have an account?"} name={"Login"} toPath={"/signin"}></FooterQuestion>
            </Card>
            <div className="w-1 h-40 border-l-2 border-[rgba(0,0,0,0.5)]"></div>
            <div className="grid grid-cols-1 gap-5">
                {authData.map((data, index) => <IconButton key={index} icon={data.icon} text={data.text} onClickFn={() => startAuth(data.provider)} />)}
            </div>
        </div>
        </>
    } else {
        navigate("/dashboard");
    } 

  
}

function IconButton({icon, text, onClickFn}) {
   return <button onClick={onClickFn} className="bg-white w-full text-black text-md font-medium py-3 px-10 rounded flex justify-center align-baseline gap-5">
    <FontAwesomeIcon icon={icon} size="lg"/>
    <span className="w-full">{text}</span></button>
}