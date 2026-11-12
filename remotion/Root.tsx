import { Composition } from "remotion";
import { Video } from "./Video";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "../lib/blueprint/script";

export const RemotionRoot = () => (
  <>
    <Composition
      id="KK-EP06"
      component={Video}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={Math.round(TOTAL_DURATION * FPS)}
      defaultProps={{ theme: "kk" as const }}
    />
    <Composition
      id="KK-EP06-Cyan"
      component={Video}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={Math.round(TOTAL_DURATION * FPS)}
      defaultProps={{ theme: "cyan" as const }}
    />
  </>
);
