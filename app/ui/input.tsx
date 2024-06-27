import clsx from 'clsx'

export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'border-blanco w-full rounded-full border-2 bg-transparent px-3 py-2 text-blanco focus:outline-none',
        className
      )}
      {...rest}
    />
  )
}
