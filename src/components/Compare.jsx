import '../styles/compare.scss'
import SwitchIcon from '../Assets/switch-icon.svg'

export function Compare({open, baseData, compareData, baseCountry, compareCountry, setIsBaseCountry}) {

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

            // Handle all the Numbers
            if (Array.isArray(baseData[properties]) && typeof baseData[properties][0].value === 'number') {
                let baseLength = (baseData[properties][0].value * 100) / baseData[properties][0].maxValue
                let compareLength = (compareData[properties][0].value * 100) / compareData[properties][0].maxValue

                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>
                            <div style={{width: baseLength+'%'}}><p>{baseData[properties][0].value}</p></div>
                        </div>
                        <p className='property'>{properties} ({baseData[properties][0].unit})</p>
                        <div className='max-stat'>
                            <div style={{width: compareLength+'%'}}><p>{compareData[properties][0].value}</p></div>
                        </div>
                    </div>
                )

                index++
            }

            // Handle health and taste
            if (properties === 'health' || properties === 'taste') {
                let childDivs = []

                childDivs.push(
                    <h4 key={index}>{properties}</h4>
                )

                index++

                for (const childProps in baseData[properties][0]) {
                    
                    // Handle numbers
                    if (typeof baseData[properties][0][childProps].value === 'number') {
                        let baseLength = (baseData[properties][0][childProps].value * 100) / baseData[properties][0][childProps].maxValue
                        let compareLength = (compareData[properties][0][childProps].value * 100) / compareData[properties][0][childProps].maxValue

                        childDivs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'>
                                    <div style={{width: baseLength+'%'}}><p>{baseData[properties][0][childProps].value}</p></div>
                                </div>
                                <p className='property'>{childProps} ({baseData[properties][0][childProps].unit})</p>
                                <div className='max-stat'>
                                    <div style={{width: compareLength+'%'}}><p>{compareData[properties][0][childProps].value}</p></div>
                                </div>
                            </div>
                        )
                    }

                    // Handle water_extraction_area
                    if (childProps === 'water_extraction_area') {
                        divs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'><p>{baseData[properties][0][childProps]}</p></div>
                                <p className='property'>Extracted Water</p>
                                <div className='max-stat'><p>{compareData[properties][0][childProps]}</p></div>
                            </div>
                        )
                    }

                    index++
                }

                // Add the childDivs to divs
                divs = divs.concat(childDivs)
            }
        }

        return divs
    }

    // Check if the compare box is opened
    if (open) {
        // Check if all the data is provided
        if (isEmptyObject(baseData)) {
            return(
                <div className='compare'>
                    <p className='feedback-msg'>Please select two countries to compare their water</p>
                </div>
            )
        } else if(isEmptyObject(compareData)) {
            return(
                <div className='compare'>
                    <p className='feedback-msg'>Please select another country to compare their water</p>
                </div>
            )
        } else {
            return(
                <div id="bg-blur">
                    <div className='compare'>
                        <div id="locations">
                            <h3>{baseCountry} <img src={SwitchIcon} onClick={()=>setIsBaseCountry(true)}/> </h3> 
                            <h3>{compareCountry}</h3>
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