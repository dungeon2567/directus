import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';

export const metadata = {
  title: 'Supabase App',
  description: 'I am Supabase App using Next.js!',
};



export default function RootLayout({ children }) {
  return (
   // <ReactQueryClientProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head>
        <body>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </body>
      </html>
    //</ReactQueryClientProvider>
  );
}
