# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.9.10] - 2017-10-07

### Adds

- New animated logo
- New content type and intro for site
- Section breaks

### Changes

- Additional breakpoint for logo

## [0.9.9] - 2017-10-07

### Changes

- Hides default pagination
- Improves spacing of comment block

## [0.9.8] - 2017-10-06

### Fixes

- Fixes iOS menu rendering
- Invalid markup from primary menu items (walker)
- Invalid markup in secondary menu
- JS minification broken due uglifier not supporting ES6
- Minification bug causing CSS to grow exponentially
- Tile nav image classes too loose, causing bg images to be applied to posts/body
- Fixes footer styling

### Adds

- New externally executed minifier (via grunt)
- New minified JS file copied into WP

## Changes

- Reworks logo handling
- Simplify general layout
- Many spacing adjustments
- WordPress updated to use minified JS.
- Minified CSS now separated and linked in WP.
- Removes duplicate/unrequired content attributes

## [0.9.7] - 2017-10-04

### Fixes

- Fixes a sizing and layout issues for main site structure
- Broken 404 page
- Critical image size hack because WP is... is... ugh.

### Changes

- New background colors
- Improved main menu
- Larger, easier to read tiles
- Scrollbar color in custom components
- Adjusted breakpoints for primary navigation

### Added

- Primary nav menu toggle now labelled for improved a11y

## [0.9.6] - 2017-10-04

### Changes

- Clean up the terrible site footer
- Improves styling of post navigation
- Improve image spacing and image captions
- Improved line-spacing for pre-text

## [0.9.5] - 2017-10-04

### Adds

- Styling of comments and replies
- Category & Tag icons, plus mixin to for easier use of Font-Awesome
- Styled meta data

### Fixes

- Wrapping of Article meta on smaller devices

## [0.9.4] - 2017-10-01

### Fixes

- Fixes several mobile menu display issues

### Changes

- Moves mobile menu to top and shifts mini logo for better modern phone usage

## [0.9.3] - 2017-10-01

### Fixes

- Article wrapping
- Fixes issue with duplicated "continue reading" link being displayed

### Adds

- Projects tile icon

## [0.9.2] - 2017-10-01

### Fixes

- Article pre-formatted text

## [0.9.1] - 2017-10-01

### Fixes

- Article headings
- Archive headings

## [0.9.0] - 2017-10-01

### Adds

- Custom sidebar
- Brand logo
- Brand logo in navigation
- mixin: links
- mixin: visuallyhidden for sr-only text

### Changes

- Site-wide branding changes
- mixin: chip now supports branding

### Fixes

- Split page layout now working
- Page breakpoints

## [0.2.0] - 2017-02-03

### Added

- Adds custom navigation support
- Component: Head
- Component: Navigation
- Component: Brand
- Adds localdev JS to pull in external CDN libs

## [0.1.0] - 2017-01-20

### Added

- Placeholder components
- copyToExternalPath to enable use with custom site
