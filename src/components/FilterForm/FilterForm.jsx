import React from 'react'

const FilterForm = ({ filter, setFilter }) => {
  function onChange (e) {
    setFilter(e.target.value)
  }
  return (
    <form>
      <label htmlFor="filter">Find contacts by name</label>
      <input value={filter} name="filter" onChange={onChange}/>
    </form>
  )
}

export default FilterForm