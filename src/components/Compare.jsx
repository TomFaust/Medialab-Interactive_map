import '../styles/compare.scss'
import SwitchIcon from '../Assets/switch-icon.svg'

export function Compare({open, baseData, compareData, setIsBaseCountry}) {

    function isEmptyObject(obj) {
        if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
            return true
        } else {
            return false
        }
    }

    // Dynamically load all the stats
    function statsDivs() {
        let divs = []
        let index = 0

        // Loop through all the properties
        for (const properties in baseData) {
            // Excluded properties: 'name'
            if (properties !== 'name') {
                let baseLength = baseData[properties]
                let compareLength = compareData[properties]

                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>
                            <div style={{width: baseLength+'%'}}>{baseData[properties]}</div>
                        </div>
                        <p>{properties}</p>
                        <div className='max-stat'>
                            <div style={{width: compareLength+'%'}}>{compareData[properties]}</div>
                        </div>
                    </div>
                )
            }

            index++
        }

        return divs
    }

    // Check if the compare box is opened
    if (open) {
        // Check if all the data is provided
        if (isEmptyObject(baseData) || isEmptyObject(compareData)) {
            return(
                <div className='compare'>
                    <p className='feedback-msg'>Please select two countries to compare their water</p>
                </div>
            )
        } else {
            return(
                <div id="bg-blur">
                    <div className='compare'>
                        <div id="locations">
                            <h3>{baseData.name} <img src={SwitchIcon} onClick={()=>setIsBaseCountry(true)}/> </h3> 
                            <h3>{compareData.name}</h3>
                        </div>

                        {statsDivs()}
                    </div>
                </div>
            )
        }
        
    } else {
        return null
    }
}