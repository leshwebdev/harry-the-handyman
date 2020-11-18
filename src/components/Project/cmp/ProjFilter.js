import React from 'react';

function ProjFilter(props) {
return (
    <input className="search-field" placeholder="Search in Projects" type="text" onChange={(ev)=> props.onFilterRes(ev.target.value)} />)
}

export default ProjFilter;