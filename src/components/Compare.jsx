import '../styles/compare.scss'

export function Compare({open, baseData, compareData}) {

    let baseCountryContent

    function isEmptyObject(obj) {
        if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
            return true
        } else {
            return false
        }
    }

    function countryContent(data) {
        if (isEmptyObject(data)) {
            return <p className='feedback-msg'>Selecteer een land op de kaart om waterstatistieken te vergelijken.</p>
        } else {
            return (
                <div>
                    <h3>{data.location}</h3>
                    <p>{data.temp}</p>
                    <p>{data.hardness}</p>
                </div>
            )
        }
    }

    if (open) {
        return(
            <div className='compare'>
                <div className="baseCountry">
                    {countryContent(baseData)}
                </div>
                <div className="compareCountry">
                    {countryContent(compareData)}
                </div>
            </div>
        )
    } else {
        return null
    }
}