import React from 'react'
import { useUserContext } from '../context';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { SignInButton } from './SignInButton';

import { NavBar as NavBarTypes } from './types';

const NavBar: React.FC = (props: NavBarTypes) => {

  const { username } = useUserContext().user;

  return (
    <nav className="new-nav">
      {/* <a href='/' className='site-title' style={{...aStyle, ...titleStyle}} >Crooked Curators</a> */}
      <Link to='/' className='site-title' reloadDocument={true}>
        <h4>Crooked Curators</h4>
      </Link>
      <ul>
        {/* <CustomLink to='/profile'>Profile</CustomLink> */}
        <h4>{username}</h4>
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