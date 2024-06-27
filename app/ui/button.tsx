import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'select-none rounded-full bg-blanco px-4 py-2 font-bold text-negro transition-all hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}>
      {children}
    </button>
  )
}
