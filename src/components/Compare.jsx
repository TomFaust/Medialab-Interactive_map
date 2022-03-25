import '../styles/compare.scss'

export function Compare({open, baseData, compareData}) {
    if (open) {
        return(
            <div className='compare'>
                <div className="country1">
                    <h3>{baseData.location}</h3>
                    <p>{baseData.temp}</p>
                    <p>{baseData.hardness}</p>
                </div>
                <div className="country2">
                    <h3>{compareData.location}</h3>
                    <p>{compareData.temp}</p>
                    <p>{compareData.hardness}</p>
                </div>
            </div>
        )
    } else {
        return null
    }
}