
const webpModules = import.meta.glob<string>(
  "@/assets/Home images/*.webp",
  { eager: true, import: "default" },
);

const desktopModules = import.meta.glob<string>(
  "@/assets/Home images/Desktop*.png",
  { eager: true, import: "default" },
);

const mobileModules = import.meta.glob<string>(
  "@/assets/Home images/Mobile*.png",
  { eager: true, import: "default" },
);

const tabletModules = import.meta.glob<string>(
  "@/assets/Home images/Tablet*.png",
  { eager: true, import: "default" },
);

function fileNameFromPath(path: string): string {
  return path.split(/[/\\]/).pop() ?? path;
}

function numberedHomeImage(path: string, prefix: "Desktop" | "Mobile" | "Tablet"): number {
  const match = fileNameFromPath(path).match(new RegExp(`${prefix} \\((\\d+)\\)`, "i"));
  return match ? Number(match[1]) : 0;
}

/** Desktop (1)+ from Home images — floor + wall panels. */
export const HOME_DESKTOP_IMAGES = Object.entries(desktopModules)
  .sort(([pathA], [pathB]) => numberedHomeImage(pathA, "Desktop") - numberedHomeImage(pathB, "Desktop"))
  .map(([, url]) => url);

/** Mobile (1)+ from Home images — floor/sky panels that stay portrait. */
export const HOME_MOBILE_IMAGES = Object.entries(mobileModules)
  .sort(([pathA], [pathB]) => numberedHomeImage(pathA, "Mobile") - numberedHomeImage(pathB, "Mobile"))
  .map(([, url]) => url);

/** Tablet (1)+ from Home images — floor/sky panels (landscape, unique from walls). */
export const HOME_TABLET_IMAGES = Object.entries(tabletModules)
  .sort(([pathA], [pathB]) => numberedHomeImage(pathA, "Tablet") - numberedHomeImage(pathB, "Tablet"))
  .map(([, url]) => url);

function screenshotNumber(path: string): number | null {
  const match = fileNameFromPath(path).match(/^screenshot_(\d+)\.webp$/i);
  return match ? Number(match[1]) : null;
}

/** Screenshot_* first (numeric), then other home images. */
export const HOME_IMAGES = Object.entries(webpModules)
  .sort(([pathA], [pathB]) => {
    const numA = screenshotNumber(pathA);
    const numB = screenshotNumber(pathB);
    if (numA !== null && numB !== null) return numA - numB;
    if (numA !== null) return -1;
    if (numB !== null) return 1;
    return pathA.localeCompare(pathB);
  })
  .map(([, url]) => url);

export const HOME_IMAGES_BY_FILE = Object.fromEntries(
  Object.entries(webpModules).map(([path, url]) => [fileNameFromPath(path), url]),
) as Record<string, string>;

/** Alias for the 3D R3F scene (same home images). */
export const PANEL_IMAGES = HOME_IMAGES;

const ALL_HOME_PANEL_IDS = [
  "4qkacp",
  "bo7rkl",
  "dyebh7",
  "1b0yzob",
  "xtohyg",
  "10qdcbj",
  "1ygc77l",
  "1b1copm",
  "1gamrs0",
  "1b1a0x5",
  "1ejg64a",
  "17zduo",
  "153ypnb",
  "jcknxk",
  "1oovirk",
  "1l4svzm",
  "1yrust3",
  "1v5kxua",
  "1o3teqt",
  "1b5g3vx",
] as const;

const FLOOR_PANEL_IDS = [
  "1ejg64a",
  "17zduo",
  "153ypnb",
  "jcknxk",
  "1oovirk",
] as const;

const SKY_PANEL_IDS = [
  "1l4svzm",
  "1yrust3",
  "1v5kxua",
  "1o3teqt",
  "1b5g3vx",
] as const;

const WALL_PANEL_IDS = ALL_HOME_PANEL_IDS.filter(
  (id) =>
    !(FLOOR_PANEL_IDS as readonly string[]).includes(id) &&
    !(SKY_PANEL_IDS as readonly string[]).includes(id),
);

/** Tablet indices for floor (3) and sky (3) — each image used once, not on walls. */
const FLOOR_TABLET_INDICES = [6, 1, 2] as const;
const SKY_TABLET_INDICES = [0, 3, 4] as const;

const HOME_PANEL_MOBILE_IDS = new Set<string>();

/** Walls: unique desktops; floor/sky: 3 tablets + 2 mobile each (no image repeats). */
export function buildHomePanelImageMap(): Record<string, string> {
  const map: Record<string, string> = {};
  HOME_PANEL_MOBILE_IDS.clear();

  WALL_PANEL_IDS.forEach((panelId, index) => {
    const src = HOME_DESKTOP_IMAGES[index];
    if (src) map[panelId] = src;
  });

  FLOOR_PANEL_IDS.forEach((panelId, index) => {
    if (index < FLOOR_TABLET_INDICES.length) {
      const src = HOME_TABLET_IMAGES[FLOOR_TABLET_INDICES[index]];
      if (src) map[panelId] = src;
      return;
    }

    // Mobile (1) on right floor panel; Mobile (2) on the other floor mobile slot.
    const mobileIndex =
      panelId === "1oovirk" ? 0 : panelId === "jcknxk" ? 1 : index - FLOOR_TABLET_INDICES.length;
    const src = HOME_MOBILE_IMAGES[mobileIndex];
    if (src) {
      map[panelId] = src;
      HOME_PANEL_MOBILE_IDS.add(panelId);
    }
  });

  SKY_PANEL_IDS.forEach((panelId, index) => {
    if (index < SKY_TABLET_INDICES.length) {
      const src = HOME_TABLET_IMAGES[SKY_TABLET_INDICES[index]];
      if (src) map[panelId] = src;
      return;
    }

    const mobileIndex = index - SKY_TABLET_INDICES.length + 2;
    const src = HOME_MOBILE_IMAGES[mobileIndex];
    if (src) {
      map[panelId] = src;
      HOME_PANEL_MOBILE_IDS.add(panelId);
    }
  });

  return map;
}

export function isHomePanelMobileMedia(panelId: string): boolean {
  return HOME_PANEL_MOBILE_IDS.has(panelId);
}

const HOME_PANEL_IMAGE_MAP = buildHomePanelImageMap();

/** Apply the homepage image map to a panel list. */
export function assignHomePanelImages<T extends { id: string }>(
  panels: T[],
): (T & { src: string })[] {
  return panels.map((panel) => ({
    ...panel,
    src: HOME_PANEL_IMAGE_MAP[panel.id] ?? "",
  }));
}

/** @deprecated Use assignHomePanelImages for the homepage scene. */
export function assignLocalImages<T extends { src: string }>(
  panels: T[],
  startIndex = 0,
): T[] {
  return panels.map((panel, i) => ({
    ...panel,
    src: HOME_IMAGES[(startIndex + i) % HOME_IMAGES.length],
  }));
}
