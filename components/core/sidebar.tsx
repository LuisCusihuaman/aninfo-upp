import Link from 'next/link';

import { menuItems } from '../config';

const Sidebar = () => {
  return (
    <aside className="hidden border-r bg-gray-100/40 p-4 dark:bg-gray-800/40 md:block">
      <nav className="grid gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.link}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            href={item.link}
            prefetch={false}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
