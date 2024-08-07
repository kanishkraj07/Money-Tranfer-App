import { Link } from "react-router-dom";
export default function FooterQuestion({question, name, toPath}) {
    return <div className="w-full text-black text-base font-medium text-center">
        <span>{question}</span> &nbsp;
        <Link to={toPath} className="underline">{name}</Link>
    </div>

}