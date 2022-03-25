import { useEffect, useState } from 'react'
import '../styles/compare.scss'

export function Compare() {
    const [data, setData] = useState({
        'name': 'Nederland',
        'temperature': 8.5,
        'hardheid': 500
    })

    useEffect(() => {
        console.log('Pull the data Kronk');
        // Fetch
    },[])

    return(
        <div className='compare'>
            <p>{data.name}</p>
            <p>{data.temperature}</p>
            <p>{data.hardheid}</p>
        </div>
    )
}