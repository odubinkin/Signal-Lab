# Tailwind Source Detection and Build Controls

Use this module when output CSS size, missing classes, monorepo paths, or external package scanning are involved.

## Source Detection Rules

- Tailwind scans source as plain text, so class tokens must exist as complete strings.
- Avoid runtime concatenation patterns like `bg-${color}-500`.
- Map props to explicit class strings in lookup objects.

## Monorepo and External Source Controls

- Set explicit source base when workspace layout requires it.
- Register additional paths with `@source` for external Tailwind-based packages.
- Exclude irrelevant paths to reduce scan noise and build time.

## Safelisting and Exclusions

- Use inline source safelisting only for truly dynamic or generated cases.
- Keep safelist surface minimal and documented.
- Explicitly exclude known-bad utility ranges if necessary.

## Output Optimization

- Keep context small and focused.
- Avoid dead utilities by removing stale templates and unused variants.
- Audit CSS growth after large UI changes.

## Anti-Patterns

- Assuming Tailwind can interpret arbitrary runtime string assembly.
- Scanning entire monorepo blindly without source controls.
- Overusing safelists as a substitute for deterministic class generation.

## Verification

- Build CSS and verify that expected utilities are present.
- Confirm no critical utilities are missing in changed screens.
- Review output-size deltas after large design-system updates.
