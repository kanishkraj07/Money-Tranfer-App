import { forwardRef } from "react"

const InputBox = forwardRef(({label, placeholder, type, varient}, ref) => {
    return <div className="flex flex-col gap-3">
        <div className={"text-black text-base font-bold " + (varient === 'search' ? 'text-xl' : 'text-base' )}>{label}</div>
        <input ref={ref} type={type} className={"outline-0 p-3 placeholder-[#606060] font-medium border-solid border border-[##C0C0C0] rounded"} placeholder={placeholder}></input>
    </div>
});

export default InputBox;