"use client"

import React from 'react';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavbarNested } from './NavbarNested';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';
import Logo from './Logo';
import { SessionContextProvider } from '@/components/SessionContext';
import { createClient } from '@/utils/supabase/client';

const client = createClient();


export default function RootLayout({ children }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <SessionContextProvider supabaseClient={client}>
        <AppShell
          header={{ height: 60 }}

          transitionDuration={500}
          transitionTimingFunction="ease"
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group justify="space-between" pl="xl" pr="xl" h="100%">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="md"
              />
              <Logo width={36} height={36} color="#ff6347" />
              <HeaderMegaMenu />
            </Group>
          </AppShell.Header>

          <AppShell.Navbar>
            <NavbarNested />
          </AppShell.Navbar>

          <AppShell.Main>          {children}</AppShell.Main>
        </AppShell>
    </SessionContextProvider>);
}
