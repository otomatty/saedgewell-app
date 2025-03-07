import { cookies } from 'next/headers';
import { StrictMode } from 'react';

import { Toaster } from '@kit/ui/sonner';
import { cn } from '@kit/ui/utils';
import { UpdateNotification } from '@kit/dev-template-update';

import { RootProviders } from '~/components/root-providers';
import { heading, inter } from '~/lib/fonts';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { generateRootMetadata } from '~/lib/root-metdata';

import '../styles/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = await createI18nServerInstance();
  const theme = await getTheme();
  const className = getClassName(theme);

  return (
    <html lang={language} className={className}>
      <body>
        <StrictMode>
          <RootProviders theme={theme} lang={language}>
            <UpdateNotification />
            {children}
          </RootProviders>

          <Toaster richColors={true} theme={theme} position="top-center" />
        </StrictMode>
      </body>
    </html>
  );
}

function getClassName(theme?: string) {
  const dark = theme === 'dark';
  const light = !dark;

  const font = [inter.variable, heading.variable].reduce<string[]>(
    (acc, curr) => {
      if (acc.includes(curr)) return acc;

      acc.push(curr);
      return acc;
    },
    []
  );

  return cn('bg-background min-h-screen antialiased', font.join(' '), {
    dark,
    light,
  });
}

async function getTheme() {
  const cookiesStore = await cookies();
  return cookiesStore.get('theme')?.value as 'light' | 'dark' | 'system';
}

export const generateMetadata = generateRootMetadata;
