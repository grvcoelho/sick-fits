import Link from 'next/link'
import StyledNav from './styles/NavStyles'
import CurrentUser from './CurrentUser'

const Nav = () => (
  <StyledNav>
    <CurrentUser>
      {({ data }) => {
        const { me } = data

        return me
          ? <p>{me.name}</p>
          : null
      }}
    </CurrentUser>

    <Link href="/items">
      <a>Shop</a>
    </Link>

    <Link href="/sell">
      <a>Sell</a>
    </Link>

    <Link href="/signup">
      <a>Signup</a>
    </Link>

    <Link href="/orders">
      <a>Orders</a>
    </Link>

    <Link href="/me">
      <a>Account</a>
    </Link>
  </StyledNav>
)

export default Nav
