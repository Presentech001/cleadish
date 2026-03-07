/**
 * Type declarations for Next.js modules when the main package resolution fails.
 * Ensures TypeScript can resolve next/link and next/navigation.
 */
declare module 'next/link' {
  import type { ComponentType, ReactNode } from 'react';
  export interface LinkProps {
    href: string;
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
  }
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import type { ComponentType, ImgHTMLAttributes } from 'react';
  export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string | { src: string; height: number; width: number };
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    [key: string]: unknown;
  }
  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    prefetch: (url: string) => void;
    refresh: () => void;
    forward: () => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}
