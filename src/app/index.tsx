import IVSPlayer, { IVSPlayerRef } from 'amazon-ivs-react-native-player';
import { useRef, useState } from 'react';
import { StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/common/text';

export default function Index() {
  const playerRef = useRef<IVSPlayerRef>(null);
  const [paused, setPaused] = useState<boolean>(true);

  const handleTogglePlayPause = async () => {
    if (!playerRef.current) return;

    if (paused) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }

    setPaused(prev => !prev);
  }

  return (
    <SafeAreaView edges={[]} className={`flex-1 items-center justify-center`}>
      <StatusBar
        animated
        showHideTransition={'slide'}
        hidden
      />
      <IVSPlayer
        ref={playerRef}
        streamUrl="https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"
        // autoplay={false}
        paused={paused}
        style={{
          flex: 1,
          width: "100%",
          // height: HEIGHT
        }}
        onDurationChange={(duration) => {
          // console.log("Duration information:", duration);
        }}
        onProgress={(progress) => {
          // console.log("Progress information:", Math.round(progress));
        }}
      >
        <View className={`h-full flex items-end justify-end`}>
          <View className={`w-full py-3 flex items-center justify-center bg-transparent`}>
            <TouchableWithoutFeedback onPress={handleTogglePlayPause}>
              <View className={`w-14 h-14 flex items-center justify-center rounded-full bg-white`}>
                <Text>
                  {paused ? "Pa" : "Pl"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </IVSPlayer>
    </SafeAreaView>
  );
}
