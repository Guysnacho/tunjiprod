import { useAudioPlayer } from "react-use-audio-player";

const Player = (props: { src: string; albumArt: string }) => {
  const player = useAudioPlayer({
    src: props.src,
    format: "mp3",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });
  return player;
};
