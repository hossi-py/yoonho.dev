import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center text-center min-h-[calc(100vh-var(--height-header))]'
      )}
    >
      <div>
        <h1
          className={cn(
            'border-r border-r-[rgba(0,0,0,0.3)]',
            'inline-block mr-5 pr-6 text-2xl font-medium align-top leading-10'
          )}
        >
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal leading-10 m-0">This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
