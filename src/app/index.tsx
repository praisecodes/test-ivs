import IVSPlayer, { IVSPlayerRef } from 'amazon-ivs-react-native-player';
import { MotiView } from 'moti';
import { useRef, useState } from 'react';
import { GestureResponderEvent, StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/common/text';

export default function Index() {
  const playerRef = useRef<IVSPlayerRef>(null);
  const [IVSPlayerStates, setIVSPlayerStates] = useState<Record<string, boolean>>({
    paused: true,
    muted: false,
    showControls: true,
  });

  const handleIVSPlayerControlsChanged = (key: keyof typeof IVSPlayerStates, value: boolean) => {
    setIVSPlayerStates(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleAutoHideControls = () => {
    const controlsTimeout = setTimeout(() => {
      if (!IVSPlayerStates.showControls) return;
      handleIVSPlayerControlsChanged("showControls", false);
      clearTimeout(controlsTimeout);
    }, (2500));
  }

  const handleTogglePlayPause = async (e: GestureResponderEvent) => {
    e.preventDefault();

    if (!playerRef.current) return;

    if (IVSPlayerStates.paused) {
      playerRef.current.play();
      handleAutoHideControls();
    } else {
      playerRef.current.pause();
    }

    handleIVSPlayerControlsChanged("paused", !IVSPlayerStates["paused"]);
  }

  const handleBgPressed = () => {
    handleIVSPlayerControlsChanged("showControls", !IVSPlayerStates["showControls"]);
    handleAutoHideControls();
  }

  return (
    <SafeAreaView edges={[]} className={`flex-1 items-center bg-black justify-center`}>
      <StatusBar
        animated
        showHideTransition={'slide'}
        hidden
      />
      <IVSPlayer
        {...IVSPlayerStates}
        ref={playerRef}
        streamUrl="https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"
        style={{
          flex: 1,
          width: "100%",
        }}
        onDurationChange={(duration) => {
          // console.log("Duration information:", duration);
        }}
        onProgress={(progress) => {
          // console.log("Progress information:", Math.round(progress));
        }}
      >
        <TouchableWithoutFeedback onPress={handleBgPressed}>
          <View className={`h-full flex items-end justify-between`}>
            <MotiView
              className={`bg-[#00000032] w-full py-4 flex flex-row`}
              from={{ opacity: 1 }}
              animate={{
                opacity: IVSPlayerStates.showControls ? 1 : 0,
                translateY: IVSPlayerStates.showControls ? 0 : -100
              }}
            >
              <SafeAreaView>
                <Text size='15' className={`text-white`}>
                  A test stream
                </Text>
              </SafeAreaView>
            </MotiView>

            <MotiView
              className={`w-full py-3 flex items-center justify-center bg-transparent`}
              from={{ opacity: 1 }}
              animate={{
                opacity: IVSPlayerStates.showControls ? 1 : 0,
                translateY: IVSPlayerStates.showControls ? 0 : 40
              }}
            >
              <TouchableWithoutFeedback onPress={handleTogglePlayPause}>
                <View className={`w-14 h-14 flex items-center justify-center rounded-full bg-[#00f]`}>
                  <Text className={`text-white`}>
                    {IVSPlayerStates.paused ? "Pl" : "Pu"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </MotiView>
          </View>
        </TouchableWithoutFeedback>
      </IVSPlayer>
    </SafeAreaView>
  );
}
