import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './getRandomNumber'


function App() {
// para gaurdar una location
  const [location, setLocation] = useState()
// para guardar la información del umput y hacer la peticion cuando se hace submit
  const [searchImput, setSearchImput] = useState("")
// para gaurdar las sugerencias de la API
const [suggestedList, setSuggestedList] = useState()
// para indicar si hay error o no
const [hasError, setHasError] = useState(false)

  
  useEffect(() => {
    let id = getRandomNumber()
    if (searchImput) {
      id= searchImput
      }
      const URL = `https://rickandmortyapi.com/api/location/${id}`
  
      axios.get(URL)
      .then (res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch (err => setHasError(true))
    }, [searchImput])
  
  
    const handleSubmit = e => {
      e.preventDefault()
      setSearchImput(e.target.idLocation.value)
  
    }

    const handleChange = e =>{

      if(e.target.value === '') {
        setSuggestedList()
      } else{
        const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`
        axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err =>console.log(err))
      }

      
    }
    
    return (
      <div className="App">
       <h1 className='app__title'>Rick and Morty</h1>
       <form onSubmit={handleSubmit}>
          <input className='input__search'
          id= "idLocation"
          placeholder='Enter another number fron 1 to 126' 
          type="text"
          onChange={handleChange}
          />
          <button>Search</button>
          <FilterList  
            suggestedList = {suggestedList}
            setSearchImput = {setSearchImput}
          
          />
       </form>
       {
        hasError ?
        <ErrorScreen/>
        :
        <>
       <LocationInfo location = {location}/>
        <div className='card-container'>
          {
            location?.residents.map(url =>(
              <CardResident
              key={url} 
              url={url}
              />
            ))        
          }
        </div> 
        </>
       }
      </div>
    )
}

export default App


