export type ContentItem = {
  title: string;
  description: string;
  link: string;
  imgSrc?: string;
  category: "game" | "project" | "physics" | "blog";
};

export const content: ContentItem[] = [
  // Games
  {
    title: "Harsh's Mango Adventure",
    description: "Help Harsh catch mangoes and avoid falling!",
    link: "/games/harsh",
    imgSrc: "/games/harsh/harsh.png",
    category: "game"
  },
  {
    title: "Doom",
    description: "A classic Doom game hosted here made by Cornelius Diekmann, battaile,and Mark.",
    link: "https://diekmann.github.io/wasm-fizzbuzz/doom/",
    imgSrc: "/games/doom/doom.png",
    category: "game"
  },
  {
    title: "Memory Match: Flipping Emoji",
    description: "Match the emojis by remembering the positions and flipping them over!",
    link: "/games/emoji",
    imgSrc: "/games/emoji/emoji.png",
    category: "game"
  },

  // Projects
  {
    title: "3D Printed Smartphone-Based Spectrometer",
    description: "A compact, low-cost spectrometer with photonic crystal integration.",
    link: "/projects/spectrometer",
    imgSrc: "/projects/spectrometer/spectro_logo.png",
    category: "project"
  },
  {
    title: "Sai Spectrum Web App",
    description: "An online spectral analysis tool for visible light spectra.",
    link: "https://saispectrum.streamlit.app/",
    imgSrc: "/projects/saispectrum/saispectrum.jpg",
    category: "project"
  },

  // Physics
  

  // Blogs
  {
    title: "Teaching myself Piccolo",
    description: "Even if I try to play softly, it still somehow cuts through the entire band. People have literally turned around mid-rehearsal to give me 'the look'...",
    link: "/blogs/piccolo",
    imgSrc: "/blogs/piccolo/piccolo.jpg",
    category: "blog"
  },
  {
    title: "Teaching myself Piccolo",
    description: " me, the ever-curious troublemaker, raised my hand. Sir, in which force does the materialization of God — like vibhooti or honey appearing — fit? The whole class froze. And the teacher, clearly not ready for this level of chaos on Day 1...",
    link: "/blogs/science_spirituality",
    imgSrc: "/blogs/science_sprituality/science_spirituality.png",
    category: "blog"
  }
];
