"use client"

import React from 'react';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavbarNested } from './NavbarNested';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';
import Logo from './Logo';
import { SessionContextProvider } from '@/components/SessionContext';
import { createClient } from '@/utils/supabase/client';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryKey
} from '@tanstack/react-query'

const client = createClient();

// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const config = queryKey[1] as any;

  const source = client.from(`${queryKey[0]}`)
      .select(config.columns, config.options)

  const { count, data, error } = await (config.filter
      ? config.filter(source)
      : source);

  if(error)
    throw error;

  return data;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});



export default function RootLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <SessionContextProvider supabaseClient={client}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SessionContextProvider>);
}
