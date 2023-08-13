'use client';
import { useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import { useSelectedLayoutSegment } from 'next/navigation';
import { NavMenu } from './NavMenu';

interface NavProps {
  links: Array<MenuItem>;
}

export interface MenuItem {
  key: string;
  label: string;
  slug?: string;
}

const G4tag = process.env.NEXT_PUBLIC_G4TAG;

const Navbar: React.FC<NavProps> = ({ links }) => {
  const activeRoute = useSelectedLayoutSegment();

  useEffect(() => {
    ReactGA.initialize(G4tag as string);
  }, [G4tag]);

  const getLinks = useMemo(() => {
    const menuItems: MenuItem[] = [
      {
        label: 'Home',
        key: '',
      },
      ...links,
    ];
    return menuItems;
  }, [links]);

  return <NavMenu navLinks={getLinks} activeLink={activeRoute || ''} />;
};

export default Navbar;
