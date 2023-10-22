import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {

    const dispatch = useDispatch()
    const filterType = useSelector(state=>state.filter.filterState)
    const handleChange = (event) => {
        dispatch(event.target.value)
      };

      console.log(filterType);
  return (
    <div></div>
  )
}

export default Navbar