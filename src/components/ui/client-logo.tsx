import { getImageProps } from "next/image";
import type { ClientLogo } from "@/content/clients";

/** Matches the `min-width: 768px` step used by the logo styles in globals.css. */
const PHONE_MEDIA = "(max-width: 767px)";

type ClientLogoImageProps = {
  logo: ClientLogo;
  alt: string;
  className?: string;
};

/** Client logo with art direction: phone artwork below 768px, desktop artwork above. */
export function ClientLogoImage({ logo, alt, className }: ClientLogoImageProps) {
  const { props } = getImageProps({
    src: logo.src,
    alt,
    width: 136,
    height: 48,
    className,
    loading: "lazy",
    unoptimized: true,
  });

  return (
    <picture>
      {logo.srcMobile ? (
        <source media={PHONE_MEDIA} srcSet={logo.srcMobile} width={120} height={44} />
      ) : null}
      <img {...props} alt={alt} />
    </picture>
  );
}
