import { talk } from "./index";

talk("Do you hear this?", "en")
  .then(() => document.write("IT WORKS!"), () => document.write("FAILED!"));
