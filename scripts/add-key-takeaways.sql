-- Run this in Supabase SQL Editor to add key_takeaways column
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS key_takeaways text DEFAULT '';

-- Example update for a post (replace slug and takeaways):
-- UPDATE blog_posts
-- SET key_takeaways = 'Always verify sender identity before paying|Never share OTP or PIN with anyone|Report to cybercrime.gov.in within 24 hours|Enable transaction alerts on your bank app'
-- WHERE slug = 'your-post-slug';
