import Link from 'next/link';

import { menuItems } from '../config';

export const NavBar = () => {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      {menuItems.map((link) => (
        <Link
          key={link.link}
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          href={link.link}
        >
          {link.icon}
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
