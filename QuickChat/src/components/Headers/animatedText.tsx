import TextSpan from './charSpan';
import './headers.css';
import { Key } from 'react';

export default function Anitext(value: any)
{
    const sentance = value.text.split("");
    return(
        
            <div className={value.class}>
                {sentance.map((letter: string, index: Key | null | undefined) =>{
                    return(
                        <text>
                                <TextSpan key = {index}>
                                    {letter  === " " ? "\u00A0" : letter}
                                </TextSpan>
                        </text>
                        
                    )
                
                    })}
            </div>
        
    );
}