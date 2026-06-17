/* ============================================================
   Notes sidebar manifest.
   To add a page: drop a .md file in notes/, then add an entry
   below. `id` becomes the URL hash (notes.html#your-id).
   Group pages under sections; reorder freely.
   ============================================================ */
window.NOTES_CONFIG = {
  // Shown above the sidebar list
  title: "Robotics Notes",

  sections: [
    {
      title: "Getting Started",
      pages: [
        { id: "intro", title: "Introduction", file: "notes/intro.md" },
      ],
    },
    {
      title: "Concepts",
      pages: [
        { id: "coordinate-frames", title: "Coordinate Frames", file: "notes/coordinate-frames.md" },
      ],
    },
    {
      title: "Machine Learning",
      pages: [
        { id: "transformers", title: "Transformer Basics", file: "notes/transformers.md" },
      ],
    },
  ],
};
