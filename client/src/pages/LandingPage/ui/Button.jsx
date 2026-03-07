import './Button.css';

/**
 * Button — reusable CTA button
 * @param {string} variant  - 'primary' | 'outline' | 'ghost'
 * @param {string} size     - 'sm' | 'md' | 'lg'
 * @param {boolean} pill    - fully rounded
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  onClick,
  href,
  className = '',
  ...props
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    pill ? 'btn--pill' : '',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
