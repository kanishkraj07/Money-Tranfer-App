import { useRef } from 'react';
import Button from './Button';
import InputBox from './InputBox';

export default function Search({label, placeholder, resultsState, setSearchQueryState, DisplaySearchResultsTemplate, noResultsLabel}) {
    
    return <div className='flex flex-col gap-5 mt-10'>
        <div className='flex flex-col gap-3'>
            <label for="searchId" className='"text-black font-bold text-xl'>{label}</label>
            <input id='searchId' onChange={(event) => setSearchQueryState(event.target.value)} type="text" className={"p-3 placeholder-[#606060] font-medium border-solid border border-[##C0C0C0] rounded"} placeholder={placeholder}></input>
        </div>
        
       {resultsState.length ? resultsState.map((result) => <DisplaySearchResultsTemplate key={result.id} id={result.id} code={result.code} name={result.name} /> ) : <div className="text-lg font-bold text-black text-center">
        {noResultsLabel}
        </div>}       
    </div>
}