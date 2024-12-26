'use client';

import {
  WalletIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Billetera',
    href: '/dashboard/wallet',
    icon: WalletIcon,
  },
  {
    name: 'Acciones',
    href: '/dashboard/argy',
    icon: ArrowTrendingUpIcon
  },
  {
    name: 'Cryptomonedas',
    href: '/dashboard/crypto',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Balances',
    href: '/dashboard/balance',
    icon: ClipboardDocumentListIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-300 hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-300 text-gray-900': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
