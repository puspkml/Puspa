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
    description: "A classic Doom game hosted here.",
    link: "https://diekmann.github.io/wasm-fizzbuzz/doom/",
    imgSrc: "/games/doom/doom.png",
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
  }
];
