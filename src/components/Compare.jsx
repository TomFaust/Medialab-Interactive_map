import '../styles/compare.scss'

export function Compare({open, baseData, compareData}) {

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
            console.log(properties + baseData[properties] + compareData[properties]);

            // Excluded properties: 'location'
            if (properties !== 'location') {
                let baseId = `base-${properties}`
                let compareId = `compare-${properties}`

                divs.push(
                    <div className="stats" key={index}>
                        <div className='max-stat'>
                            <div id={baseId}>{baseData[properties]}</div>
                        </div>
                        <p>{properties}</p>
                        <div className='max-stat'>
                            <div id={compareId}>{compareData[properties]}</div>
                        </div>
                    </div>
                )
            }

            index++
        }

        console.log(divs);

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
                            <h3>{baseData.location}</h3>
                            <h3>{compareData.location}</h3>
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