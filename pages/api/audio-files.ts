import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export type TrackMetadata = {
  id: string;
  name: string;
  stems: {
    id: string;
    name: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackMetadata[]>
) {
  // taken from https://medium.com/@boris.poehland.business/next-js-api-routes-how-to-read-files-from-directory-compatible-with-vercel-5fb5837694b9
  const dirRelativeToPublicFolder = "audio_files";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  const trackNames = fs.readdirSync(dir);

  const data = trackNames.map((trackName) => {
    const stemsPath = `audio_files/${trackName}`;
    const stemsDir = path.resolve("./public", stemsPath);
    const stems = fs.readdirSync(stemsDir);

    return {
      id: trackName,
      name: trackName,
      stems: stems.map((stem) => {
        return { id: stem, name: stem };
      }),
    };
  });

  res.status(200).json(data);
}
