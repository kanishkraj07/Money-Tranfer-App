export default function Card({children, size}) {
    return <div className={"bg-white rounded-lg flex flex-col p-10 gap-5 shadow-md shadow-[rgba(0,0,0,0.5)]" + (size === "xl" ? " w-1/3" : " w-96")}>
        {children}
        </div>
}