export type SocialLink = { label: string; href: string }

// Derived from the locally configured Git origin; no contact or social profiles are guessed.
export const socialLinks: readonly SocialLink[] = [
  { label: 'GitHub profile', href: 'https://github.com/ConsoleX-ir' },
]

// Add only after the owner supplies a verified address or profile.
export const contactEmail: string | null = null
export const linkedInProfile: string | null = null
