import Link from "next/link";
import {LinkIt, LinkItUrl} from "react-linkify-it";

interface LinkifyProps{
    children: React.ReactNode;
}

const Linkify = ({children}: LinkifyProps) => {
  return (
    <LinkifyUsername>
        <LinkifyHashtag>
            <LinkifyUrl>{children}</LinkifyUrl>
        </LinkifyHashtag>
    </LinkifyUsername>
  )
}

function LinkifyUrl({children} : LinkifyProps){
    return <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
}

function LinkifyUsername({children} : LinkifyProps){

    return <LinkIt 
                regex={/(#[a-zA-Z0-9_.-]+)/}
                component={(match, key) =>{
                    return <Link 
                                key={key} href={`/hashtags/${match.slice(1)}`} 
                                className="text-primary hover:underline">{match}</Link>
                }}
            >
                {children}
    </LinkIt>
}

function LinkifyHashtag({children} : LinkifyProps){

    return <LinkIt 
                regex={/(@[a-zA-Z0-9_.-]+)/}
                component={(match, key) =>{
                    return <Link 
                    key={key} href={`/hashtags/${match.slice(1)}`} 
                    className="text-primary hover:underline">{match}</Link>
                }}
            >
                {children}
            </LinkIt>
}

export default Linkify