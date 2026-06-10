import React from "react";
import { ArrowRightIcon, DownloadIcon, ExternalLinkIcon, GithubIcon } from "./Icons.jsx";

const BUTTON_ICONS = { "arrow-right": ArrowRightIcon, download: DownloadIcon, external: ExternalLinkIcon, github: GithubIcon };

/** Signal Kit CTA button — solid cyan w/ glow, or zinc outline. */
export function Button({ variant = "primary", icon, children, href, ...rest }) {
  const Tag = href ? "a" : "button";
  const Icon = icon ? BUTTON_ICONS[icon] : null;
  const iconEl = Icon ? (
    <Icon
      className={icon === "arrow-right" ? "sk-btn-arrow" : undefined}
      style={{ width: 16, height: 16 }}
    />
  ) : null;
  return (
    <Tag className={`sk-btn sk-btn--${variant}`} href={href} {...rest}>
      {icon === "download" ? iconEl : null}
      <span>{children}</span>
      {icon && icon !== "download" ? iconEl : null}
    </Tag>
  );
}
