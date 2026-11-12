import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Oswald";
import { BlueprintVideo } from "../lib/blueprint/BlueprintVideo";
import { THEMES } from "../lib/blueprint/theme";

loadFont("normal", { weights: ["700"], subsets: ["latin"] });

export const Video = ({ theme }: { theme: keyof typeof THEMES }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <BlueprintVideo time={frame / fps} theme={THEMES[theme]} />
    </AbsoluteFill>
  );
};
