import React, {useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import Link from './Link'
import {FEED_SEARCH_QUERY} from '../queries'

function Search() {
  const [searchFilter, setSearchFilter] = useState('')
  const [executeSearch, {data}] = useLazyQuery(FEED_SEARCH_QUERY)

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    executeSearch({variables: {filter: searchFilter}})
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search</label>
        <input type="text" name="search" onChange={(e) => setSearchFilter(e.target.value)} />
        <button onClick={handleSearch}>Ok</button>
      </form>
      {data && data.feed.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
    </>
  )
}

export default Search
