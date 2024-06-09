import { Package2Icon, PanelLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { ModeToggle } from './mode-toggle';
import NavBar from './navbar';

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
      <Link
        href="#"
        className="flex items-center gap-2 font-semibold"
        prefetch={false}
      >
        <Package2Icon className="size-6" />
        <span className="text-lg">UPP</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="sm:hidden" size="icon" variant="outline">
            <PanelLeftIcon className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-xs" side="left">
          <NavBar />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative size-8 rounded-full" variant="outline">
              <Avatar>
                <AvatarImage alt="@shadcn" src="/placeholder.svg" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={-4} className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder.svg" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-none">Administrador de Cobranza</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@psa.com
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
