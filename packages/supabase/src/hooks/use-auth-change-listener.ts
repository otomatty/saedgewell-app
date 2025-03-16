/**
 * use-auth-change-listener.ts
 *
 * このファイルは認証状態の変更を監視し、適切な処理を行うためのカスタムフックを提供します。
 *
 * 主な機能:
 * - 認証状態の変更イベント（サインイン、サインアウトなど）の監視
 * - 未認証ユーザーのプライベートルートへのアクセス制限
 * - カスタムイベントハンドラのサポート
 *
 * 処理の流れ:
 * 1. useSupabaseフックを使用してSupabaseクライアントを取得
 * 2. useEffectフック内でclient.auth.onAuthStateChange()を使用して認証状態の変更を監視
 * 3. 認証状態が変更された場合（イベント発生時）:
 *    - カスタムイベントハンドラが提供されている場合はそれを実行
 *    - ユーザーが未認証かつプライベートルートにアクセスしている場合はホームページにリダイレクト
 *    - サインアウトイベントが発生した場合はページをリロード（ただし認証ページ内の場合は除く）
 * 4. コンポーネントのアンマウント時にリスナーを解除
 *
 * 特記事項:
 * - プライベートルートのプレフィックスはデフォルトで'/home'と'/update-password'が設定されているが、
 *   カスタマイズ可能
 * - 認証ページのパスは'/auth'として定義されており、サインアウトイベント時の特別処理に使用
 * - isPrivateRoute関数でパスがプライベートルートかどうかを判定
 *
 * 使用例:
 * ```
 * // アプリのルートコンポーネントなどで
 * useAuthChangeListener({
 *   appHomePath: '/',
 *   privatePathPrefixes: ['/dashboard', '/profile', '/settings'],
 *   onEvent: (event, session) => {
 *     if (event === 'SIGNED_IN') {
 *       console.log('ユーザーがサインインしました', session?.user);
 *     } else if (event === 'SIGNED_OUT') {
 *       console.log('ユーザーがサインアウトしました');
 *     }
 *   }
 * });
 * ```
 *
 * 注意点:
 * - このフックはクライアントコンポーネント内でのみ使用可能です
 * - 通常はアプリのルートコンポーネントなど、高いレベルのコンポーネントで一度だけ使用します
 * - window.location.assignを使用したリダイレクトは、ブラウザの履歴スタックに新しいエントリを
 *   追加するため、必要に応じてrouter.pushなどに置き換えることも検討できます
 */
'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { useSupabase } from './use-supabase';

/**
 * @name PRIVATE_PATH_PREFIXES
 * @description A list of private path prefixes
 */
const PRIVATE_PATH_PREFIXES = ['/home', '/update-password'];

/**
 * @name AUTH_PATHS
 * @description A list of auth paths
 */
const AUTH_PATHS = ['/auth'];

/**
 * @name useAuthChangeListener
 * @param privatePathPrefixes - A list of private path prefixes
 * @param appHomePath - The path to redirect to when the user is signed out
 * @param onEvent - Callback function to be called when an auth event occurs
 */
export function useAuthChangeListener({
  privatePathPrefixes = PRIVATE_PATH_PREFIXES,
  appHomePath,
  onEvent,
}: {
  appHomePath: string;
  privatePathPrefixes?: string[];
  onEvent?: (event: AuthChangeEvent, user: Session | null) => void;
}) {
  const client = useSupabase();
  const pathName = usePathname();

  useEffect(() => {
    // keep this running for the whole session unless the component was unmounted
    const listener = client.auth.onAuthStateChange((event, user) => {
      if (onEvent) {
        onEvent(event, user);
      }

      // log user out if user is falsy
      // and if the current path is a private route
      const shouldRedirectUser =
        !user && isPrivateRoute(pathName, privatePathPrefixes);

      if (shouldRedirectUser) {
        // send user away when signed out
        window.location.assign('/');

        return;
      }

      // revalidate user session when user signs in or out
      if (event === 'SIGNED_OUT') {
        // sometimes Supabase sends SIGNED_OUT event
        // but in the auth path, so we ignore it
        if (AUTH_PATHS.some((path) => pathName.startsWith(path))) {
          return;
        }

        window.location.reload();
      }
    });

    // destroy listener on un-mounts
    return () => listener.data.subscription.unsubscribe();
  }, [client.auth, pathName, privatePathPrefixes, onEvent]);
}

/**
 * Determines if a given path is a private route.
 */
function isPrivateRoute(path: string, privatePathPrefixes: string[]) {
  return privatePathPrefixes.some((prefix) => path.startsWith(prefix));
}
