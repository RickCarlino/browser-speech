import { talk } from "./index";

talk("Do you hear anything? You should.", "en")
  .then(() => document.write("IT WORKS!"), () => document.write("FAILED!"));
