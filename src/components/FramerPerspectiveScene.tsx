import { CSSProperties, useEffect, useMemo, useState } from "react";
import gridSvg from "@/assets/framer-grid.svg";
import logoImage from "@/assets/en_zuo_logo_transparent.webp";
import noiseTexture from "@/assets/noise-tex.webp";
import { assignHomePanelImages, isHomePanelMobileMedia } from "@/lib/panelImages";
import { MenuOverlay } from "@/components/MenuOverlay";

const EASE = "cubic-bezier(0.44, 0, 0.56, 1)";

/** Home mobile PNGs are 941×1672 — scale width from panel height. */
const MOBILE_IMAGE_WIDTH_RATIO = 941 / 1672;

function isVerticalMediaPanel(panelId: string) {
  return isHomePanelMobileMedia(panelId);
}

function panelImageStyle(panelId: string): CSSProperties {
  const base: CSSProperties = {
    display: "block",
    borderRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "translateZ(0.01px)",
    imageRendering: "auto",
  };

  if (isVerticalMediaPanel(panelId)) {
    return {
      ...base,
      height: "100%",
      width: "auto",
      maxWidth: "100%",
      objectFit: "contain",
      objectPosition: "50% 50%",
    };
  }

  return {
    ...base,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
  };
}

interface EntryConfig {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

interface PanelLayout {
  id: string;
  width: number;
  height: number;
  left: string;
  top?: string;
  bottom?: string;
  mobileLeft?: string;
  mobileTop?: string;
  mobileBottom?: string;
  translateZ?: number;
  entry: EntryConfig;
  duration: number;
  delay: number;
}

interface PanelConfig extends PanelLayout {
  src: string;
}

interface GroupConfig {
  id: string;
  width: number;
  height: number;
  left: string;
  top: string;
  transform: string;
  panels: PanelConfig[];
}

const RIGHT_PANELS: PanelLayout[] = [
  {
    id: "4qkacp",
    width: 242,
    height: 134,
    left: "660px",
    top: "31px",
    entry: { x: -1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1,
    delay: 0.8,
  },
  {
    id: "bo7rkl",
    width: 165,
    height: 91,
    left: "628px",
    top: "116px",
    entry: { x: -1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.2,
    delay: 0.8,
  },
  {
    id: "dyebh7",
    width: 124,
    height: 56,
    left: "396px",
    top: "65px",
    entry: { x: -1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.1,
    delay: 0.8,
  },
  {
    id: "1b0yzob",
    width: 165,
    height: 91,
    left: "766px",
    bottom: "36px",
    entry: { x: -1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.3,
    delay: 0.8,
  },
  {
    id: "xtohyg",
    width: 165,
    height: 74,
    left: "calc(50.938566552901044% - 165px / 2)",
    bottom: "123px",
    entry: { x: -1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.1,
    delay: 0.8,
  },
];

const LEFT_PANELS: PanelLayout[] = [
  {
    id: "10qdcbj",
    width: 165,
    height: 81,
    left: "623px",
    top: "100px",
    entry: { x: 1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1,
    delay: 0.8,
  },
  {
    id: "1ygc77l",
    width: 165,
    height: 91,
    left: "330px",
    top: "44px",
    entry: { x: 1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.4,
    delay: 0.8,
  },
  {
    id: "1b1copm",
    width: 165,
    height: 91,
    left: "385px",
    top: "calc(46.174863387978164% - 91px / 2)",
    entry: { x: 1000, y: 0, scale: 1, opacity: 0.4 },
    duration: 1.3,
    delay: 0.8,
  },
  {
    id: "1gamrs0",
    width: 165,
    height: 91,
    left: "268px",
    bottom: "36px",
    entry: { x: 1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.1,
    delay: 0.8,
  },
  {
    id: "1b1a0x5",
    width: 165,
    height: 91,
    left: "147px",
    top: "85px",
    entry: { x: 1000, y: 0, scale: 0.4, opacity: 1 },
    duration: 1.2,
    delay: 0.8,
  },
];

const FLOOR_PANELS: PanelLayout[] = [
  {
    id: "1ejg64a",
    width: 149,
    height: 90,
    left: "73px",
    bottom: "162px",
    mobileLeft: "86px",
    mobileBottom: "184px",
    entry: { x: 0, y: -1000, scale: 0.4, opacity: 1 },
    duration: 1.4,
    delay: 0.8,
  },
  {
    id: "17zduo",
    width: 115,
    height: 112,
    left: "342px",
    bottom: "146px",
    mobileLeft: "322px",
    mobileBottom: "234px",
    entry: { x: 0, y: -1000, scale: 0.4, opacity: 1 },
    duration: 1,
    delay: 0.8,
  },
  {
    id: "153ypnb",
    width: 152,
    height: 175,
    left: "36px",
    bottom: "299px",
    translateZ: 40,
    entry: { x: 0, y: -1000, scale: 0.4, opacity: 1 },
    duration: 1.3,
    delay: 0.8,
  },
  {
    id: "jcknxk",
    width: 64,
    height: 113,
    left: "246px",
    bottom: "272px",
    mobileLeft: "272px",
    mobileBottom: "314px",
    entry: { x: 0, y: -1000, scale: 0.4, opacity: 1 },
    duration: 1.2,
    delay: 0.8,
  },
  {
    id: "1oovirk",
    width: 96,
    height: 170,
    left: "433px",
    bottom: "357px",
    mobileLeft: "409px",
    mobileTop: "225px",
    mobileBottom: "unset",
    entry: { x: 0, y: -1000, scale: 0.4, opacity: 1 },
    duration: 1.4,
    delay: 0.8,
  },
];

const SKY_PANELS: PanelLayout[] = [
  {
    id: "1l4svzm",
    width: 135,
    height: 150,
    left: "305px",
    top: "calc(46.50000000000002% - 150px / 2)",
    entry: { x: 0, y: 1000, scale: 0.4, opacity: 1 },
    duration: 1.4,
    delay: 0.8,
  },
  {
    id: "1yrust3",
    width: 107,
    height: 58,
    left: "354px",
    top: "178px",
    mobileLeft: "137px",
    mobileTop: "unset",
    mobileBottom: "354px",
    entry: { x: 0, y: 1000, scale: 0.4, opacity: 1 },
    duration: 1.1,
    delay: 0.8,
  },
  {
    id: "1v5kxua",
    width: 123,
    height: 90,
    left: "136px",
    top: "329px",
    mobileLeft: "283px",
    mobileTop: "139px",
    entry: { x: 0, y: 1000, scale: 0.4, opacity: 1 },
    duration: 1.2,
    delay: 0.8,
  },
  {
    id: "1o3teqt",
    width: 132,
    height: 74,
    left: "263px",
    top: "222px",
    mobileLeft: "159px",
    mobileTop: "326px",
    entry: { x: 0, y: 1000, scale: 0.4, opacity: 1 },
    duration: 1.1,
    delay: 0.8,
  },
  {
    id: "1b5g3vx",
    width: 95,
    height: 54,
    left: "76px",
    top: "208px",
    mobileLeft: "139px",
    mobileTop: "212px",
    entry: { x: 0, y: 1000, scale: 0.4, opacity: 1 },
    duration: 1,
    delay: 0.8,
  },
];

const GROUPS: GroupConfig[] = [
  {
    id: "right",
    width: 1172,
    height: 366,
    left: "calc(51.77967558892649% - 1172px / 2)",
    top: "calc(50.07084468664852% - 366px / 2)",
    transform: "perspective(500px) rotateY(-55deg) translateZ(0)",
    panels: assignHomePanelImages(RIGHT_PANELS),
  },
  {
    id: "left",
    width: 1172,
    height: 366,
    left: "calc(48.22032441107356% - 1172px / 2)",
    top: "calc(49.91825613079021% - 366px / 2)",
    transform: "perspective(500px) rotateY(55deg) translateZ(0)",
    panels: assignHomePanelImages(LEFT_PANELS),
  },
  {
    id: "floor",
    width: 545,
    height: 1000,
    left: "calc(50.01432911102197% - 545px / 2)",
    top: "calc(51.5640326975477% - 1000px / 2)",
    transform: "perspective(500px) rotateX(73deg) translateZ(0)",
    panels: assignHomePanelImages(FLOOR_PANELS),
  },
  {
    id: "sky",
    width: 545,
    height: 1000,
    left: "calc(50.00286582220441% - 545px / 2)",
    top: "calc(48.653950953678496% - 1000px / 2)",
    transform: "perspective(500px) rotateX(-73deg) translateZ(0)",
    panels: assignHomePanelImages(SKY_PANELS),
  },
];

function panelStyle(
  panel: PanelConfig,
  entered: boolean,
  isMobile: boolean,
): CSSProperties {
  const z = panel.translateZ ?? 0;
  const startTransform = `translateX(${panel.entry.x}px) translateY(${panel.entry.y}px) translateZ(${z}px) scale(${panel.entry.scale})`;
  const endTransform = `translateX(0px) translateY(0px) translateZ(${z}px) scale(1)`;

  const left = isMobile && panel.mobileLeft ? panel.mobileLeft : panel.left;
  const top = isMobile ? (panel.mobileTop ?? panel.top) : panel.top;
  const bottom = isMobile ? (panel.mobileBottom ?? panel.bottom) : panel.bottom;
  const width = isVerticalMediaPanel(panel.id)
    ? Math.round(panel.height * MOBILE_IMAGE_WIDTH_RATIO)
    : panel.width;

  return {
    position: "absolute",
    width,
    height: panel.height,
    left,
    top,
    bottom,
    opacity: entered ? 1 : panel.entry.opacity,
    transform: entered ? endTransform : startTransform,
    transition: `transform ${panel.duration}s ${EASE} ${panel.delay}s, opacity ${panel.duration}s ${EASE} ${panel.delay}s`,
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    ...(isVerticalMediaPanel(panel.id)
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }
      : {}),
  };
}

function gridSizeForWidth(width: number) {
  if (width >= 1690) return { width: 2019, height: 1109 };
  if (width >= 1440) return { width: 1701, height: 934 };
  if (width >= 810) return { width: 1585, height: 870 };
  return { width: 1576, height: 865 };
}

/** Cap DPR used for 3D layer supersampling — sharper panels, same visual layout. */
function useSupersample() {
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    const update = () =>
      setFactor(Math.min(Math.max(window.devicePixelRatio || 1, 1), 2));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return factor;
}

export function FramerPerspectiveScene() {
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const isMobile = viewportWidth <= 809;
  const supersample = useSupersample();
  const gridSize = useMemo(() => gridSizeForWidth(viewportWidth), [viewportWidth]);
  const logoSize = isMobile ? { width: 425, height: 174 } : { width: 641, height: 263 };

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <div
            className="absolute"
            style={{
              backgroundImage: `url(${noiseTexture})`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
              opacity: 0.1,
              inset: "-200%",
              width: "400%",
              height: "400%",
            }}
          />
        </div>

        <img
          src={gridSvg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50"
          style={{ width: gridSize.width, height: gridSize.height }}
        />

        <div
          className="absolute z-20 overflow-hidden"
          style={{
            inset: "-4195px -8000px -4180px -8007px",
            transform: `scale(${1 / supersample})`,
            transformOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${supersample})`,
              transformOrigin: "50% 50%",
              transformStyle: "preserve-3d",
            }}
          >
          {GROUPS.map((group) => (
            <div
              key={group.id}
              className="absolute overflow-hidden"
              style={{
                width: group.width,
                height: group.height,
                left: group.left,
                top: group.top,
                transform: group.transform,
                zIndex: 1,
                transformStyle: "preserve-3d",
              }}
            >
              {group.panels.map((panel) => (
                <div
                  key={panel.id}
                  style={{
                    ...panelStyle(panel, entered, isMobile),
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={panel.src}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading="eager"
                    style={panelImageStyle(panel.id)}
                  />
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <img
          src={logoImage}
          alt="EN ZUO"
          style={{
            width: logoSize.width,
            height: logoSize.height,
            objectFit: "contain",
          }}
        />
      </div>

      <div className="absolute inset-x-0 z-50 flex justify-center" style={{ bottom: 48 }}>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="rounded-[32px] bg-white px-8 py-2 text-[24px] leading-none text-black transition-all duration-300 hover:px-10 hover:py-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Menu
        </button>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
