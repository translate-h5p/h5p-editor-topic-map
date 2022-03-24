import { Audio } from "./H5P/Audio";
import { Video } from "./H5P/Video";
import { Link } from "./Link";

export type DialogContent = {
  hasNote: boolean;
  links?: Array<Link>;
  text?: string;
  video?: Video;
  audio?: {
    /**
     * "Optional" because we can't force the user
     * to add a file, therefore there's an off-chance
     * that the value will be nullish
     *  */
    file?: Audio;
    subtext?: string;
  };
};
