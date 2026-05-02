import { NavLink, Outlet } from 'react-router-dom';
import { BookOpenText, Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

import { type ReactNode } from 'react';

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))] font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {children}
    </div>
  );
}

function TopNav() {
  const linkBase =
    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200';

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <BookOpenText className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Blog Minimaliste</div>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                linkBase,
                isActive
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-[rgb(var(--muted))] hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100',
              )
            }
          >
            <BookOpenText className="size-4" />
            <span className="hidden sm:inline">Posts</span>
          </NavLink>
          <NavLink
            to="/posts/new"
            className={({ isActive }) =>
              cn(
                linkBase,
                isActive
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-[rgb(var(--muted))] hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100',
              )
            }
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Nouveau</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-[rgb(var(--border))] py-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 text-xs text-[rgb(var(--muted))]">
        <p>© {new Date().getFullYear()} Blog. Tous droits réservés.</p>
        <div className="flex items-center gap-4">
          <NavLink to="/about" className="hover:text-[rgb(var(--fg))] transition-colors">
            À propos
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export function RootLayout() {
  return (
    <AppShell>
      <TopNav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </AppShell>
  );
}
