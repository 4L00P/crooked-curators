import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { SignInButton } from './SignInButton';

import { NavBar as NavBarTypes } from './types';

const NavBar: React.FC = (props: NavBarTypes) => {

  return (
    <nav className="new-nav">
      {/* <a href='/' className='site-title' style={{...aStyle, ...titleStyle}} >Crooked Curators</a> */}
      <Link to='/' className='site-title' reloadDocument={true}>
        Crooked Curators
      </Link>
      <ul>
        <CustomLink to='/profile'>Profile</CustomLink>
        <SignInButton />
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children, ...props}) => {

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default NavBar;