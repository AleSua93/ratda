import type { NextApiRequest, NextApiResponse } from "next";
import { getUrlForFiles } from "../../../utils/s3";

export type AudioFilesDownloadUrl = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AudioFilesDownloadUrl>
) {
  const preSignedUrl = await getUrlForFiles();
  res.status(200).json(preSignedUrl);
}
