import { Link, useLocation, NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { SIDEBAR_ITEMS } from '~/appConstants';
import { LogoIcon } from '~/components';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className='p-2 sidebar'>
      <Link to='/' className='logo text-center logo-light'>
        <span className='logo-lg'>
          <LogoIcon />
        </span>
      </Link>
      <ul className='side-nav'>
        {SIDEBAR_ITEMS.map((item) => {
          if (!item.url) {
            return (
              <li key={item.id} className='side-nav-title'>
                ADMIN
              </li>
            );
          }

          const isActive = location.pathname.startsWith(item.url);

          return (
            <li key={item.id} className='mb-1'>
              <NavLink to={item.url} className={clsx('side-nav-link', isActive && 'active', 'rounded')}>
                <i className={clsx(item.icon, 'me-3')}></i>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
