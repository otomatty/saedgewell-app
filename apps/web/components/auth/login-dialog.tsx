'use client';

import pathsConfig from '~/config/paths.config';
import authConfig from '~/config/auth.config';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import { SignInMethodsContainer } from '@kit/auth/sign-in';

export const LoginDialog = () => {
  const paths = {
    callback: pathsConfig.auth.callback,
    home: pathsConfig.app.home,
  };

  return (
    <ResponsiveDialog
      trigger={<Button>ログインする</Button>}
      title="ログイン"
      description="ソーシャルアカウントでログインしてください"
      contentClassName="sm:max-w-[400px]"
    >
      <SignInMethodsContainer paths={paths} providers={authConfig.providers} />
    </ResponsiveDialog>
  );
};
