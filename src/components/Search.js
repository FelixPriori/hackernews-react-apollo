import React, {useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import gql from 'graphql-tag'
import Link from './Link'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

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
