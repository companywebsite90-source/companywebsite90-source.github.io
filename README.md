# Sparkon Labs — Company Website

A simple, static multi-page website for **Sparkon Labs** (robotics kits & intelligent systems),
built with plain HTML + CSS + a little JavaScript. No build step, no frameworks.

## Pages

| Page | File | Source |
|------|------|--------|
| Landing / About Us | `index.html` | PDF page 3 |
| Core Values | `core-values.html` | PDF page 4 |
| Domain Expertise | `domain-expertise.html` | PDF page 5 |
| AI & Software Services | `services-ai-software.html` | PDF page 6 |
| Hardware & Design Services | `services-hardware-design.html` | PDF page 7 |
| Education Services | `services-education.html` | PDF page 8 |
| Contact Us | `contact.html` | email → companywebsite90@gmail.com |

Shared assets: `css/style.css`, `js/main.js`.

Every page has a top navigation bar linking to all the others, and the landing page has clickable
cards/buttons to each section.

---

## Viewing the site locally

You don't strictly need a server — you can open `index.html` directly in a browser. But to mirror
how it will behave on GitHub Pages (and so links resolve cleanly), run the tiny local server:

```bash
cd /coc/testnvme/yali30/code/websites/sparkon/companywebsite90-source.github.io
./serve.sh           # or: ./serve.sh 8080  to pick a different port
```

This starts Python's built-in web server on port **8000** (override with an argument).

### Viewing from an HPC cluster (SSH port-forwarding)

Because the site runs on a remote cluster node, forward the port to your **local** machine.

1. On the cluster, start the server (note the hostname of the node you're on — `hostname`):

   ```bash
   ./serve.sh 8000
   ```

2. On your **local** laptop/desktop, open an SSH tunnel:

   ```bash
   # If you log straight into the node:
   ssh -N -L 8000:localhost:8000 yali30@<cluster-host>

   # If the web server runs on a compute node reached via a login node, tunnel through it:
   ssh -N -L 8000:<compute-node-hostname>:8000 yali30@<login-host>
   ```

3. Open your local browser at:

   ```
   http://localhost:8000/
   ```

Press `Ctrl+C` in the server terminal to stop it.

> Tip: if port 8000 is already in use, pick another (e.g. `./serve.sh 8123`) and update the
> `-L 8123:localhost:8123` part of the SSH command to match.

---

## Contact form

The contact form is client-side only (works on static hosting like GitHub Pages). On submit it opens
the visitor's email client with a pre-filled message addressed to **companywebsite90@gmail.com**.

If you later want messages delivered automatically without the visitor's mail app, wire the form up
to a form backend such as [Formspree](https://formspree.io/) or [Getform](https://getform.io/) — only
the `<form>` action in `contact.html` needs to change.

---

## Publishing to GitHub Pages

This repository is named `companywebsite90-source.github.io`, so pushing to the default branch
publishes it as a **user site** at:

```
https://companywebsite90-source.github.io/
```

No extra configuration is needed beyond enabling Pages for the repository (Settings → Pages →
Build and deployment → Deploy from a branch → `main` / root).
