'use client';

import { ICON_SIZE_CLASS, menuItems } from '@/components/config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="space-y-6">
        {menuItems
          .filter((item) => item.title !== 'Inicio')
          .map((item) => (
            <Card key={item.title} className="w-full">
              <CardHeader className="flex flex-col items-start space-y-2">
                <CardTitle className="text-lg font-semibold">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between w-full">
                <Link href={item.link}>
                  <Button variant="outline" className="flex items-center gap-2">
                    Ir
                  </Button>
                </Link>
                <div className="ml-2">{item.icon}</div>
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}
