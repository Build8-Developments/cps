import { createClient } from "next-sanity";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "./env";

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      token: sanityReadToken,
      // Public pages must never carry stega edit markers; see the draft client in fetch.ts.
      stega: false,
    })
  : null;
