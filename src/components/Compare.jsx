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
            // console.log(properties + ': ' + compareData[properties]);
            // Excluded properties: 'name'

            // Handle all the Numbers
            if (typeof baseData[properties] == 'number') {
                let baseLength = (baseData[properties].value * 100) / baseData[properties].max
                let compareLength = (compareData[properties].value * 100) / compareData[properties].max

                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>
                            <div style={{width: baseLength+'%'}}>{baseData[properties].value}</div>
                        </div>
                        <p>{properties} ({baseData[properties].unit})</p>
                        <div className='max-stat'>
                            <div style={{width: compareLength+'%'}}>{compareData[properties].value}</div>
                        </div>
                    </div>
                )
            }

            // Handle all the Strings
            if (typeof baseData[properties] == 'string') {
                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>{baseData[properties].value}</div>
                        <p>{properties}</p>
                        <div className='max-stat'>String: {compareData[properties].value}</div>
                    </div>
                )
            }

            // Handle health and taste
            if (properties === 'health' || properties === 'taste') {
                let childDivs = []

                childDivs.push(
                    <h4>{baseData[properties]}</h4>
                )
                

                for (const childProps in baseData[properties]) {
                    
                    // Handle numbers
                    if (typeof childProps == 'number') {
                        let baseLength = (baseData[properties][childProps].value * 100) / baseData[properties][childProps].max
                        let compareLength = (compareData[properties][childProps].value * 100) / compareData[properties][childProps].max

                        childDivs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'>
                                    <div style={{width: baseLength+'%'}}>{baseData[properties][childProps].value}</div>
                                </div>
                                <p>{properties}({baseData[properties][childProps].unit})</p>
                                <div className='max-stat'>
                                    <div style={{width: compareLength+'%'}}>{compareData[properties][childProps].value}</div>
                                </div>
                            </div>
                        )
                    }

                    // Handle strings
                    if (typeof childProps == 'string') {
                        divs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'>{baseData[properties]}</div>
                                <p>{properties}</p>
                                <div className='max-stat'>String: {compareData[properties]}</div>
                            </div>
                        )
                    }
                }

                // Add the childDivs to divs
                divs = divs.concat(childDivs)
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

                        <div>
                            {/* TODO: Uncomment when the correct data is being collected */}
                            {/* <small>{baseData.company} | {baseData.date} | {baseData.period}</small>
                            <small>{compareData.company} | {compareData.date} | {compareData.period}</small> */}
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