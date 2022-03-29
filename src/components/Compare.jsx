import '../styles/compare.scss'

export function Compare({open, baseData, compareData}) {

    function isEmptyObject(obj) {
        if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
            return true
        } else {
            return false
        }
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

                        <div className="stats">
                            <div className='max-stat'>
                                <div id='base-hardness'>{baseData.hardness}</div>
                            </div>
                            <p>Hardness</p>
                            <div className='max-stat'>
                                <div id='compare-hardness'>{compareData.hardness}</div>
                            </div>
                        </div>

                        <div className="stats">
                            <div className='max-stat'>
                                <div id='base-temp'>{baseData.temp}</div>
                            </div>
                            <p>Temperature</p>
                            <div className='max-stat'>
                                <div id='compare-temp'>{compareData.temp}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    } else {
        return null
    }
}