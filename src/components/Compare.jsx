import { useEffect, useState } from 'react'
import '../styles/compare.scss'

export function Compare() {
    const [data, setData] = useState({
        'name': 'Nederland',
        'temperature': 8.5,
        'hardheid': 500
    })
    const [data2, setData2] = useState({
        'name': 'Frankrijk',
        'temperature': 6.3,
        'hardheid': 650
    })

    useEffect(() => {
        console.log('Pull the data Kronk');
        // Fetch
    },[])

    return(
        <div className='compare'>
            <div className="country1">
                <h3>{data.name}</h3>
                <p>{data.temperature}</p>
                <p>{data.hardheid}</p>
            </div>
            <div className="country2">
                <h3>{data2.name}</h3>
                <p>{data2.temperature}</p>
                <p>{data2.hardheid}</p>
            </div>
        </div>
    )
}