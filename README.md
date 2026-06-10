# andyqin18.github.io

Personal website for Tianhao (Andy) Qin — a single-page site built with plain HTML + Bootstrap.
Hosted on GitHub Pages at <https://andyqin18.github.io>. No build step.

## Structure

```
index.html           # the whole site (one long page, anchor-nav sections)
css/style.css        # styling (accent color, layout)
js/main.js           # footer year + mobile menu behavior
assets/
  img/profile.jpg    # your photo  (add this)
  cv.pdf             # your resume (add this)
  projects/          # project thumbnails
  pubs/              # publication thumbnails
```

To **add a project or publication**: copy one `<div class="entry"> ... </div>` block in
`index.html` and edit the text/links inside it. Drop the thumbnail image in the matching
`assets/` folder.

## Preview locally (same on Linux & macOS)

From the repo folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Edit a file, save, refresh the browser to see changes.
Press `Ctrl+C` to stop the server.

This local preview is private to your machine — nothing goes live until you push (see below).

**If you get `Address already in use`:** a server is still running on that port. Find it
and either reuse it, kill it, or use a different port:

```bash
ss -ltnp | grep :8000          # shows the process name + PID using port 8000
kill $(lsof -t -i:8000)        # stop whatever is holding the port
python3 -m http.server 8001    # …or just use another port
```

## How publishing works (important)

GitHub Pages serves whatever is on the **`main`** branch. **Every push to `main` goes
live immediately** at <https://andyqin18.github.io> — there is no staging step.

So the rule is: **keep unfinished work off `main`.** Do all editing on a `dev` branch,
and only merge into `main` when the site is ready to be seen.

### Editing without going live (use the `dev` branch)

One-time setup (creates the work-in-progress branch and puts it on GitHub):

```bash
git checkout -b dev
git push -u origin dev
```

Day-to-day editing — this does **not** affect the live site:

```bash
git checkout dev               # make sure you're on dev
# ...edit files...
git add -A
git commit -m "work in progress"
git push                       # pushes to dev — still private
```

### Publish when ready

Merge `dev` into `main` and push — *this* is the step that goes live:

```bash
git checkout main
git merge dev
git push                       # live within a minute
git checkout dev               # switch back to keep working
```

## Working across two machines

Everything lives on GitHub, so both machines stay in sync through the `dev` branch.

On a new machine, clone and switch to `dev`:

```bash
git clone https://github.com/andyqin18/andyqin18.github.io.git
cd andyqin18.github.io
git checkout dev
```

On any machine you've already cloned, **pull before you start** and **push when you finish**:

```bash
git checkout dev
git pull                       # grab the latest before editing
# ...edit, commit...
git push                       # save your work to GitHub
```
