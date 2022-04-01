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

            // Handle all the Strings
            if (typeof baseData[properties] == 'string') {
                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>{baseData[properties]}</div>
                        <p>{properties}</p>
                        <div className='max-stat'>String: {compareData[properties]}</div>
                    </div>
                )
            }

            // Handle health and taste
            if (baseData[properties] === 'health' || baseData[properties] === 'taste') {
                let childDivs = []

                childDivs.push(
                    <h4>{baseData[properties]}</h4>
                )
                

                for (const childProps in baseData[properties]) {
                    
                    // Handle numbers
                    if (typeof baseData[properties][childProps] == 'number') {
                        let baseLength = baseData[properties][childProps]
                        let compareLength = compareData[properties][childProps]
                        
                        childDivs.push(
                            <div className="stats" key={index}>
                                <div className='max-stat'>
                                    <div style={{width: baseLength+'%'}}>{baseData[properties][childProps]}</div>
                                </div>
                                <p>{properties}</p>
                                <div className='max-stat'>
                                    <div style={{width: compareLength+'%'}}>{compareData[properties][childProps]}</div>
                                </div>
                            </div>
                        )
                    }

                    // Handle strings
                    if (typeof baseData[properties][childProps] == 'string') {
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