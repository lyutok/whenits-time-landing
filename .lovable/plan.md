# WhenItsTime interactive app page

## Goal
Add a separate `/app` experience that feels like the iOS app itself: clean, flat, atmospheric, and grounded in the supplied screenshots rather than a marketing layout.

## Experience
- Build a focused phone-like workspace with Paris and New York as the initial locations.
- Show live local times, working-hour status, and the strongest overlap window.
- Add a working time dial/slider so changing the hour updates both cities and the availability message.
- Add simple app views for Home, Explore, and Reminders, following the supplied screen content and interaction patterns.
- Let users switch the compared cities from the supplied city set and toggle a reminder locally for the current session.
- Keep controls accessible, touch-friendly, and fully usable on desktop and mobile.

## Visual direction
- Continue the landing page’s pale morning blue and deep teal accents, but flatten the presentation into an edge-to-edge iOS-inspired interface.
- Use the real screenshots as the source for hierarchy, labels, city data, and available features without embedding fake dashboards or adding unsupported features.
- Use restrained transitions between views and respect reduced-motion preferences.

## Site integration
- Keep the current landing page intact at `/`.
- Add the experience at `/app` with unique page metadata.
- Point the landing page’s “Get the app” navigation action to the interactive experience while preserving App Store download buttons.

## Validation
- Check the new page at desktop and mobile widths.
- Verify time adjustment, view switching, city switching, and reminder state.
- Confirm no horizontal overflow, console errors, or build errors.
