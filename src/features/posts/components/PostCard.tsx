import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { type PostDto } from '../../../api/jsonplaceholder'
import { motion } from 'framer-motion'
import { useUsers } from '../hooks/useUsers'
import { Skeleton } from '../../../ui/components/Skeleton'

export function PostCard({ post, className }: { post: PostDto; className?: string }) {
  const { data: users, isLoading } = useUsers();
  
  const author = users?.find(u => u.id === post.userId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative flex flex-col items-start justify-between rounded-2xl border border-[rgb(var(--border))] bg-transparent p-6 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
        className
      )}
    >
      <div className="flex-1 w-full">
        <h3 className="text-base font-semibold text-[rgb(var(--fg))] line-clamp-2 pr-8">{post.title}</h3>
        <p className="mt-3 text-sm text-[rgb(var(--muted))] line-clamp-3">{post.body}</p>
      </div>
      <Link
        to={`/posts/${post.id}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`Voir l'article ${post.title}`}
      />
      <div className="mt-6 flex w-full items-center justify-between text-xs font-medium text-[rgb(var(--muted))]">
        <span className="inline-flex items-center gap-1.5 truncate pr-2">
          {isLoading ? <Skeleton className="h-4 w-24" /> : (author?.name || `Utilisateur #${post.userId}`)}
        </span>
        <span className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 text-[rgb(var(--fg))] shrink-0">
          Lire <ArrowUpRight className="size-3" />
        </span>
      </div>
    </motion.div>
  )
}
