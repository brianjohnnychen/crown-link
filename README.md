# Crown Link Products Corporation — Website

Static B2B website for Crown Link Products Corporation (冠霖產品有限公司), a precision
fastener trading company in Gangshan District, Kaohsiung, Taiwan. Built for GitHub Pages —
no build tools, no frameworks, no server-side code.

## 1. Deploy to GitHub Pages

1. Push the contents of this folder to a GitHub repository (the `index.html` must be at
   the repository root).
2. Go to repository **Settings → Pages**.
3. Set **Source** to "Deploy from branch".
4. Set **Branch** to `main` and **Folder** to `/ (root)`.
5. Click **Save** and wait 2–3 minutes.
6. The site goes live at `https://[username].github.io/[repo-name]/`.

## 2. Connect the custom domain via Cloudflare

1. In GitHub Pages settings, enter the custom domain `www.crown-link.com` (the `CNAME`
   file in this repository already contains it).
2. In Cloudflare DNS, add four **A records** for `@` pointing to:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add a **CNAME record** for `www` pointing to `[username].github.io`.
4. Set **SSL/TLS mode** to **Full**.
5. Enable the Cloudflare proxy (orange cloud).
6. Wait up to 24 hours for DNS propagation.

## 3. Activate the Formspree contact form

1. Register at [formspree.io](https://formspree.io).
2. Create a new form and copy the form ID (it looks like `xpzgkdqr`).
3. In `pages/contact.html`, replace `REPLACE_WITH_YOUR_FORMSPREE_ID` with your actual
   Formspree form ID.
4. Push the change.
5. Test with a real submission.

## 4. Update the sitemap base URL

In `sitemap.xml`, replace all instances of `https://www.crown-link.com/` with your actual
live domain once confirmed.
