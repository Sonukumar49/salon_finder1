# Step 3 – Real salons

1. Supabase -> SQL Editor -> New query -> paste ALL of  supabase/step3_import_real_salons.sql -> Run.
   (This removes the 18 demo salons and adds your real ones.)
2. Supabase -> Table Editor -> salons: you should see your real salons.
3. Push the new code:  git add .  /  git commit -m "step 3"  /  git push

What the code now does
- "Open now" is calculated from each salon's opening hours (India time).
- "Use my location" button on the results page -> real distance (needs lat/lng on the salon).
- Missing photo -> placeholder with initials.  Missing price -> "Price on request".
- Missing rating -> no rating badge.  Missing WhatsApp -> button hidden.

To fill gaps later: Supabase -> Table Editor -> salons -> double-click the cell
(image, lat, lng, whatsapp, rating...). The live site updates on refresh.
