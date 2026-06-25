/* ============================================================
   Notes sidebar manifest.
   To add a page: drop a .md file in notes/, then add an entry
   below. `id` becomes the URL hash (notes.html#your-id).
   Group pages under sections; reorder freely.
   A section's `pages` show directly; a section's `groups` are
   collapsible dropdowns (e.g. a "Terms" group), each with its
   own `pages`.
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
    {
      title: "Computer Vision",
      // Works / papers show directly under the section.
      pages: [
        { id: "resnet", title: "ResNet", file: "notes/works/resnet.md" },
        { id: "vit", title: "Vision Transformer", file: "notes/works/vit.md" },
      ],
      // Terms are tucked into a collapsible dropdown to save vertical space.
      groups: [
        {
          title: "Terms",
          pages: [
            { id: "convolution", title: "Convolution", file: "notes/terms/convolution.md" },
            { id: "residual-connection", title: "Residual Connection", file: "notes/terms/residual-connection.md" },
            { id: "self-attention", title: "Self-Attention", file: "notes/terms/self-attention.md" },
          ],
        },
      ],
    },
    {
      title: "Reinforcement Learning",
      pages: [
        { id: "dqn", title: "DQN", file: "notes/works/dqn.md" },
        { id: "ppo", title: "PPO", file: "notes/works/ppo.md" },
      ],
      groups: [
        {
          title: "Terms",
          pages: [
            { id: "q-learning", title: "Q-Learning", file: "notes/terms/q-learning.md" },
            { id: "policy-gradient", title: "Policy Gradient", file: "notes/terms/policy-gradient.md" },
            { id: "advantage-estimation", title: "Advantage Estimation", file: "notes/terms/advantage-estimation.md" },
          ],
        },
      ],
    },
  ],
};
