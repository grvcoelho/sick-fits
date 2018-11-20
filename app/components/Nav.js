import Link from 'next/link'
import { Fragment } from 'react'
import StyledNav from './styles/NavStyles'
import CurrentUser from './CurrentUser'

const Nav = () => (
  <CurrentUser>
    {({ data: { me }}) => (
      <StyledNav>
        <Link href="/items">
          <a>Shop</a>
        </Link>

        {me && (
          <Fragment>
            <Link href="/sell">
              <a>Sell</a>
            </Link>

            <Link href="/orders">
              <a>Orders</a>
            </Link>

            <Link href="/me">
              <a>Account</a>
            </Link>
          </Fragment>
        )}

        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </StyledNav>
    )}
  </CurrentUser>
)

export default Nav
