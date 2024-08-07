export default  function Button ({name, size, varient, onClickFn})  {
    return <button onClick={() => onClickFn()} className={ "outline-0 border border-solid text-white text-base font-medium text-center rounded-md py-3 shadow-md" + (size === 'sm' ? " w-40" : " w-full") + (varient === 'green' ? " bg-[#26c35d]" : " bg-black")}>
        {name}
    </button>
};

