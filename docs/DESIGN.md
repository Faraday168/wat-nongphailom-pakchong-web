---
name: Suwannaphum Serenity
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d4'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ed'
  surface-container: '#f5ece7'
  surface-container-high: '#efe6e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#4d4635'
  inverse-surface: '#34302c'
  inverse-on-surface: '#f8efea'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#e9c349'
  secondary: '#a04100'
  on-secondary: '#ffffff'
  secondary-container: '#ff7a2e'
  on-secondary-container: '#612500'
  tertiary: '#5f5e5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#b5b3ae'
  on-tertiary-container: '#464541'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f5'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style

The brand personality is grounded in **serenity, respect, and spiritual clarity**. This design system serves a sacred space, necessitating a UI that feels like an architectural extension of the temple grounds—open, quiet, and intentional. The target audience includes local practitioners seeking merit-making information, international visitors interested in meditation, and the elder community requiring high legibility.

The design style is **Modern Thai Minimalism**. It strips away the visual "noise" often found in traditional temple sites, favoring a clean, professional structure that allows spiritual content to breathe. Traditional elements are reinterpreted through a modern lens:
- **Minimalism:** Use of expansive whitespace (Ma) to evoke a sense of mental stillness.
- **Modern Corporate:** A reliable, systematic foundation that ensures accessibility and trust.
- **Tactile Accents:** Subtle uses of "Thai Lai Thai" patterns as low-opacity watermarks or delicate dividers to provide cultural grounding without clutter.

## Colors

The palette is inspired by the sacred materials and garments of Thai Buddhism.

- **Primary (Warm Gold - #D4AF37):** Representing the Buddha and enlightenment. Used for key calls to action, active states, and decorative accents.
- **Secondary (Deep Saffron - #CC5500):** Representing the monastic Sangha. Used sparingly for highlights, secondary buttons, or signifying importance in ceremony schedules.
- **Tertiary (Lotus White - #F9F6F0):** A warm, off-white background color that reduces eye strain and provides a softer, more "natural" feel than pure white.
- **Neutral (Charcoal - #2D2926):** Used for typography to ensure high contrast against the Lotus White background, maintaining a professional and grounded tone.

## Typography

The typography strategy balances contemporary Thai aesthetics with universal accessibility.

- **Headlines:** Use **Be Vietnam Pro**. While a sans-serif, its curves mirror the elegance of modern Thai script (loopless style), providing a sophisticated and welcoming feel.
- **Body & Labels:** Use **Noto Sans**. Chosen for its exceptional legibility in both Latin and Thai scripts, ensuring that dhamma teachings and temple notices are accessible to all ages.
- **Styling:** Headings should use "Sentence case" to remain approachable. For Pali chants or traditional quotes, use an italicized *Body-lg* to differentiate sacred text from administrative content.

## Layout & Spacing

This design system utilizes a **Fixed Grid** on desktop to maintain a contained, meditative focus, transitioning to a **Fluid Grid** on mobile.

- **The Breath:** Generous vertical spacing (Section Gaps) of 128px on desktop is mandatory between major content blocks. This "white space" is functional, signaling a transition in thought or topic.
- **Alignment:** Use a 12-column grid for desktop. Primary content should ideally occupy the center 8 columns to create wide, restful margins.
- **Mobile:** Margins shrink to 16px, but vertical spacing remains relatively high (64px - 80px) to prevent the mobile experience from feeling "cramped" or urgent.

## Elevation & Depth

To maintain a grounded and "earthy" feel, this design system avoids heavy drop shadows.

- **Tonal Layers:** Depth is primarily created through subtle color shifts. Cards and containers use a slightly lighter or darker shade of the Tertiary background rather than floating.
- **Low-Contrast Outlines:** Use 1px borders in a muted gold or light grey for input fields and containers.
- **Soft Diffusion:** For high-priority modals (e.g., a donation confirmation), use an extremely diffused, low-opacity shadow (#D4AF37 at 10% opacity) to create a subtle glow rather than a harsh shadow, simulating the radiance of candlelight.

## Shapes

The shape language is **Soft (0.25rem)**. 

While Thai architecture features sharp peaks, the digital experience should feel gentle and "human." Rounded corners on buttons and cards suggest kindness (Metta). 
- **Standard Radius:** 4px (Soft) for most components.
- **Large Radius:** 12px for prominent image containers or cards.
- **Decorative:** Circular containers are reserved for monastic portraits or ceremonial icons, symbolizing the "Wheel of Dhamma" (Dharmachakra).

## Components

- **Buttons:** Primary buttons use a solid Gold (#D4AF37) background with White text. Secondary buttons use a Gold 1px outline with Gold text. Transitions should be slow (300ms) to reflect a calm pace.
- **Cards:** Cards should have no borders and no shadows; instead, use a slightly different background tone (e.g., #FFFFFF on a #F9F6F0 page) to define boundaries.
- **Dividers:** Use horizontal lines with a small, centered "Thai Lai Thai" floral ornament or a simple 3-dot (anicca, dukkha, anatta) motif.
- **Inputs:** Clean, bottom-border-only fields are preferred to maintain a minimal look, using Saffron for the active focus state.
- **Lists:** Bullet points should be replaced with small gold lotus icons or simple gold squares.
- **Navigation:** A sticky, transparent-to-opaque header that remains unobtrusive. Use simple text labels with a 2px gold underline for the active state.