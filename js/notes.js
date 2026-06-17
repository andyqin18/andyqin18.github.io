/* ============================================================
   A1 notes loader.
   - Reads notes/notes-config.js (window.NOTES_CONFIG)
   - Builds the left sidebar
   - On hash change, fetches the page's .md, renders it with
     marked, highlights code, and builds the right-hand TOC
   No build step: runs entirely in the browser.
   Requires being served over http(s) (e.g. localhost:8000) so
   fetch() of the .md files is allowed.
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.NOTES_CONFIG || { sections: [] };

  // Flat list of pages in sidebar order (for prev/next + default page).
  var pages = [];
  cfg.sections.forEach(function (section) {
    (section.pages || []).forEach(function (p) { pages.push(p); });
  });

  var navEl = document.getElementById("docsNav");
  var contentEl = document.getElementById("docsContent");
  var tocListEl = document.getElementById("tocList");
  var pagerEl = document.getElementById("docsPager");
  var tocNavEl = document.getElementById("tocNav");
  var searchEl = document.getElementById("docsSearch");

  // Configure marked once.
  if (window.marked) {
    marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
  }

  // ---- Sidebar -------------------------------------------------
  function buildSidebar() {
    navEl.innerHTML = "";
    cfg.sections.forEach(function (section) {
      if (section.title) {
        var head = document.createElement("li");
        head.className = "docs-nav-section";
        head.textContent = section.title;
        navEl.appendChild(head);
      }
      (section.pages || []).forEach(function (p) {
        var li = document.createElement("li");
        li.className = "docs-nav-item";
        var a = document.createElement("a");
        a.href = "#" + p.id;
        a.textContent = p.title;
        a.dataset.id = p.id;
        li.appendChild(a);
        navEl.appendChild(li);
      });
    });
  }

  function highlightActiveSidebar(id) {
    navEl.querySelectorAll("a").forEach(function (a) {
      a.classList.toggle("active", a.dataset.id === id);
    });
  }

  // ---- Slugify headings for anchors ----------------------------
  function slugify(text) {
    return text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  // ---- Render a page -------------------------------------------
  function findPage(id) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].id === id) return { page: pages[i], index: i };
    }
    return null;
  }

  function renderPage(id) {
    var match = findPage(id) || (pages.length ? { page: pages[0], index: 0 } : null);
    if (!match) {
      contentEl.innerHTML = "<p class='text-muted'>No notes configured yet.</p>";
      return;
    }
    var page = match.page;
    highlightActiveSidebar(page.id);

    fetch(page.file, { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        return res.text();
      })
      .then(function (md) {
        contentEl.innerHTML = window.marked ? marked.parse(md) : md;
        enhanceContent();
        buildToc();
        buildPager(match.index);
        document.title = page.title + " — Robotics Notes";
        // Jump to in-page anchor if the URL had one (#id::section)
        scrollToSubAnchor();
        window.scrollTo(0, 0);
      })
      .catch(function (err) {
        contentEl.innerHTML =
          "<div class='alert alert-warning'>Could not load <code>" +
          page.file + "</code>: " + err.message +
          "<br><small>If you opened this file directly, serve it over " +
          "<code>http://localhost:8000</code> instead (browsers block " +
          "fetch() on <code>file://</code>).</small></div>";
        tocListEl.innerHTML = "";
        pagerEl.innerHTML = "";
      });
  }

  // Add ids to headings + highlight code.
  function enhanceContent() {
    var used = {};
    contentEl.querySelectorAll("h2, h3").forEach(function (h) {
      var base = slugify(h.textContent);
      var slug = base, n = 2;
      while (used[slug]) { slug = base + "-" + n++; }
      used[slug] = true;
      h.id = slug;
    });
    if (window.hljs) {
      contentEl.querySelectorAll("pre code").forEach(function (block) {
        hljs.highlightElement(block);
      });
    }
    // Render LaTeX math ($…$ inline, $$…$$ display) with KaTeX.
    if (window.renderMathInElement) {
      renderMathInElement(contentEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
      });
    }
  }

  // ---- Right-hand "On this page" TOC ---------------------------
  function buildToc() {
    tocListEl.innerHTML = "";
    var heads = contentEl.querySelectorAll("h2, h3");
    if (!heads.length) {
      tocNavEl.style.visibility = "hidden";
      return;
    }
    tocNavEl.style.visibility = "visible";
    heads.forEach(function (h) {
      var li = document.createElement("li");
      li.className = h.tagName === "H3" ? "toc-sub" : "toc-top";
      var a = document.createElement("a");
      a.href = "#" + location.hash.slice(1).split("::")[0] + "::" + h.id;
      a.textContent = h.textContent;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", a.getAttribute("href"));
      });
      li.appendChild(a);
      tocListEl.appendChild(li);
    });
  }

  // ---- Prev / next ---------------------------------------------
  function buildPager(index) {
    pagerEl.innerHTML = "";
    var prev = pages[index - 1];
    var next = pages[index + 1];
    if (prev) {
      var pa = document.createElement("a");
      pa.className = "pager-link pager-prev";
      pa.href = "#" + prev.id;
      pa.innerHTML = "<span class='pager-label'><i class='bi bi-arrow-left'></i> Previous</span>" +
        "<span class='pager-title'>" + prev.title + "</span>";
      pagerEl.appendChild(pa);
    }
    if (next) {
      var na = document.createElement("a");
      na.className = "pager-link pager-next";
      na.href = "#" + next.id;
      na.innerHTML = "<span class='pager-label'>Next <i class='bi bi-arrow-right'></i></span>" +
        "<span class='pager-title'>" + next.title + "</span>";
      pagerEl.appendChild(na);
    }
  }

  // ---- Sidebar filter ------------------------------------------
  if (searchEl) {
    searchEl.addEventListener("input", function () {
      var q = searchEl.value.toLowerCase().trim();
      navEl.querySelectorAll(".docs-nav-item").forEach(function (li) {
        var hit = li.textContent.toLowerCase().indexOf(q) !== -1;
        li.style.display = hit ? "" : "none";
      });
    });
  }

  // ---- Hash routing --------------------------------------------
  // Hash format: #pageId  or  #pageId::headingId
  var currentPage = null;

  function scrollToSubAnchor() {
    var parts = location.hash.slice(1).split("::");
    if (parts[1]) {
      var target = document.getElementById(parts[1]);
      if (target) target.scrollIntoView({ block: "start" });
    }
  }

  function route() {
    var pageId = location.hash.slice(1).split("::")[0];
    if (!pageId && pages.length) pageId = pages[0].id;
    if (pageId === currentPage) {
      // Same page, just a heading jump.
      scrollToSubAnchor();
      return;
    }
    currentPage = pageId;
    renderPage(pageId);
  }

  // ---- Init ----------------------------------------------------
  buildSidebar();
  window.addEventListener("hashchange", route);
  route();
})();
