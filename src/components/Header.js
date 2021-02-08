import React from 'react'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {AUTH_TOKEN} from '../constants'

function Header() {
  const history = useHistory()

  /* 
    WARNING
    Storing JWTs in localStorage is not a safe approach to implement authentication on the frontend. 
    Because this tutorial is focused on GraphQL, we want to keep things simple and therefore are using it here.
  */
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>

        <div className="ml1">|</div>

        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>

        <div className="ml1">|</div>

        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>

        <div className="ml1">|</div>

        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                history.push(`/`)
              }}
            >
              logout
            </div>
          ) : (
            <Link to="login" className="ml1 no-underline black">
              login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
