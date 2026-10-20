# To-do — product work still to build

The running backlog. Add items as Punna names them, tick them off when they
ship, and keep one line per item. Open price questions live in
`docs/PRICING.md` → "Still open".

## Job details & leads
- [ ] Job list → job details flow (`/apnahire/jobs` → `/apnahire/jobs/[id]`): candidate leads, Applied | Database matches (Active leads)
- [ ] Job details journeys: no leads yet · leads arriving · after the job expires (empty states and banners for each)

## Account
- [ ] User profile section (`/apnahire/profile`)
- [ ] Credits & usage page (`/apnahire/usage`): balances, usage, invoices, history. Never a checkout entry point

## Banners
- [ ] Which banners show at each step of the journey, and how they combine (renewal, expiry, low credits, offers); one rule for priority and stacking

## Subscription city lock
- [ ] Job posting after a subscription purchase: ask the recruiter to lock the plan to one city
- [ ] Once locked, it can't be changed in the product; unlocking only through customer support (or special cases, TBD)
- [ ] Before locking: dashboard → available credits / balance shows "City not set", with a way to set it
- [ ] Carry the locked city through every flow that reads it: job posting location, balance view, plan cards ("Valid in a single city"), upgrades
