import { QueryClient } from "@tanstack/react-query";
import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const PHONE_BASE_WIDTH = Platform.OS === "android" ? 412 : 420;
const TABLET_BASE_WIDTH = 768;

const isTablet = Math.min(WIDTH, HEIGHT) >= 600;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);


const scale = (size: number) => {
  const baseWidth = isTablet ? TABLET_BASE_WIDTH : PHONE_BASE_WIDTH;

  const maxScaleFactor = isTablet ? 1.25 : 1.15;
  const minScaleFactor = 0.85;

  const scaleFactor = clamp(
    WIDTH / baseWidth,
    minScaleFactor,
    maxScaleFactor
  );

  return size * scaleFactor;
};

const getMetrics = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(scale(size)));

const queryClient = new QueryClient();

const runOnLoad = async () => { }

const formatTime = (seconds: number): string => {
  if (seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  return `${pad(mins)}:${pad(secs)}`;
};

export {
  formatTime, getMetrics, HEIGHT, queryClient,
  runOnLoad,
  WIDTH
};

