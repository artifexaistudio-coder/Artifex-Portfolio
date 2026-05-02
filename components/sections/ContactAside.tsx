export function IconLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center h-11 w-11 rounded-xl glass hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M6.94 6.5A2.25 2.25 0 1 1 4.69 4.25 2.25 2.25 0 0 1 6.94 6.5ZM6.75 20.75H4.63V9.25H6.75V20.75ZM20.75 20.75H18.63V14.72c0-1.44-.03-3.28-2-3.28-2 0-2.31 1.56-2.31 3.18v6.13H12.2V9.25h2.03v1.57h.03a2.22 2.22 0 0 1 2-1.1c2.14 0 2.53 1.41 2.53 3.24v7.79Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M18.9 2H22l-6.8 7.8L23.2 22h-6.8l-5.3-6.4L5.5 22H2.4l7.3-8.4L1 2h7l4.8 5.7L18.9 2Zm-1.2 18h1.7L7.1 3.9H5.3L17.7 20Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}
