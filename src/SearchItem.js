import React from 'react'

const SearchItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='search'>Search</label>
            <input
                id='search'
                type='text'
                placeholder='Search Items'
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
        </form>
  )
}

export default SearchItem