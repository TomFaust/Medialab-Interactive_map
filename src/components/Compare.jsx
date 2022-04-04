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
                            <div style={{width: baseLength+'%'}}>{baseData[properties][0].value}</div>
                        </div>
                        <p>{properties} ({baseData[properties][0].unit})</p>
                        <div className='max-stat'>
                            <div style={{width: compareLength+'%'}}>{compareData[properties][0].value}</div>
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
                                    <div style={{width: baseLength+'%'}}>{baseData[properties][0][childProps].value}</div>
                                </div>
                                <p>{childProps}({baseData[properties][0][childProps].unit})</p>
                                <div className='max-stat'>
                                    <div style={{width: compareLength+'%'}}>{compareData[properties][0][childProps].value}</div>
                                </div>
                            </div>
                        )
                    }

                    // Handle strings
                    if (typeof baseData[properties][0][childProps] === 'string') {
                        console.log(childProps + ': ' + baseData[properties][0][childProps]);
                        divs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'>{baseData[properties][0][childProps]}</div>
                                <p>{childProps}</p>
                                <div className='max-stat'>{compareData[properties][0][childProps]}</div>
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
                            <h3>{baseCountry} <img src={SwitchIcon} onClick={()=>setIsBaseCountry(true)}/> </h3> 
                            <h3>{compareCountry}</h3>
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