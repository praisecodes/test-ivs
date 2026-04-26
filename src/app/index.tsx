import IVSPlayer from 'amazon-ivs-react-native-player';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView edges={[]} className={`flex-1 items-center justify-center`}>
      <StatusBar
        animated
        showHideTransition={'slide'}
        hidden
      />
      <IVSPlayer
        streamUrl="https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"
        autoplay
        style={{
          flex: 1,
          width: "100%",
          // height: HEIGHT
        }}
      />
    </SafeAreaView>
  );
}
