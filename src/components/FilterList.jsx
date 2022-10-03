import React from 'react'

const FilterList = ({suggestedList, setSearchImput}) => {

    const handleClick = id =>setSearchImput(id)

  return (
    <ul>
        {
            suggestedList?.map(location =>(
                <li onClick={() => handleClick(location.id)} key={location.id}>{location.name}</li>
                
            ))
        }
    </ul>
  )
}

export default FilterList