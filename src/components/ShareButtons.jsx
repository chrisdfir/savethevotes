"use client";

import { useState, useCallback } from "react";

const SITE_URL = "https://www.savethevotes.org";
const SHARE_TEXT =
  "The SAVE Act could change how Americans register to vote. Find out what documents you need — state-by-state guide:";

function ShareButton({ href, onClick, label, children, className = "" }) {
  const Tag = href ? "a" : "button";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Tag
      {...props}
      aria-label={label}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-elevated text-text-muted hover:text-accent hover:border-accent/40 transition-colors ${className}`}
    >
      {children}
    </Tag>
  );
}

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = SITE_URL;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const encodedUrl = encodeURIComponent(SITE_URL);
  const encodedText = encodeURIComponent(SHARE_TEXT);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-text-muted uppercase tracking-wider mr-1">
        Share
      </span>

      {/* Facebook */}
      <ShareButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        label="Share on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </ShareButton>

      {/* X / Twitter */}
      <ShareButton
        href={`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        label="Share on X"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </ShareButton>

      {/* Bluesky */}
      <ShareButton
        href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}`}
        label="Share on Bluesky"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 568 501" fill="currentColor">
          <path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664z" />
        </svg>
      </ShareButton>

      {/* Reddit */}
      <ShareButton
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent("Save the Votes — What documents you need under the SAVE Act")}`}
        label="Share on Reddit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="14" r="1.5" />
          <circle cx="15" cy="14" r="1.5" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.8 11.33c.02.16.03.33.03.5 0 2.55-2.97 4.63-6.63 4.63s-6.63-2.07-6.63-4.63c0-.17.01-.34.03-.5-.46-.26-.77-.74-.77-1.3 0-.83.67-1.5 1.5-1.5.39 0 .74.15 1.01.39 1-.72 2.37-1.18 3.9-1.24l.74-3.49.01-.04c.05-.2.23-.34.44-.32l2.47.52c.17-.36.54-.6.96-.6.58 0 1.06.47 1.06 1.06s-.47 1.06-1.06 1.06-1.06-.47-1.06-1.06l-2.2-.46-.6 2.84c1.47.08 2.79.53 3.76 1.24.27-.24.63-.39 1.01-.39.83 0 1.5.67 1.5 1.5 0 .56-.31 1.04-.77 1.3z" />
          <path d="M14.5 17.18c-.55.36-1.3.58-2.14.65-.07.01-.14.01-.21.01h-.3c-.07 0-.14 0-.21-.01-.84-.07-1.59-.29-2.14-.65-.12-.08-.14-.24-.04-.35.08-.1.22-.13.33-.07.47.31 1.13.5 1.85.56h.62c.72-.06 1.38-.25 1.85-.56.11-.06.25-.03.33.07.1.11.08.27-.04.35z" />
        </svg>
      </ShareButton>

      {/* Email */}
      <ShareButton
        href={`mailto:?subject=${encodeURIComponent("Save the Votes — What documents you need under the SAVE Act")}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${SITE_URL}`)}`}
        label="Share via email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </ShareButton>

      {/* Copy Link */}
      <ShareButton
        onClick={copyLink}
        label={copied ? "Link copied!" : "Copy link"}
        className={copied ? "text-accent border-accent/40" : ""}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </ShareButton>
    </div>
  );
}
