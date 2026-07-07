// Ambient declaration so TypeScript accepts side-effect CSS imports
// (e.g. `import "react-toastify/dist/ReactToastify.css"`) under
// moduleResolution: "bundler", which otherwise reports TS2882.
declare module "*.css";
