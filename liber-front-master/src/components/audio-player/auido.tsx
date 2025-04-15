/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import 'react-jinke-music-player/assets/index.css';
import ReactJkMusicPlayer, {
  ReactJkMusicPlayerProps,
} from 'react-jinke-music-player';

const AuidoRoute = ({ audioFiles }: any) => {
  const audioLists = audioFiles?.map((file: any) => ({
    name: file?.title,
    musicSrc: `${process.env.NEXT_PUBLIC_BASE_URL}${file?.body}`,
    singer: file?.book_author,
    cover: `${process.env.NEXT_PUBLIC_BASE_URL}${file?.book_image}`,
  }));
  const options: ReactJkMusicPlayerProps = {
    audioLists,
    toggleMode: true,
    showDestroy: true,
    // showReload: false,
    showDownload: false,
    showLyric: false,
    drag: false,
    showThemeSwitch: true,
    quietUpdate: true,
    clearPriorAudioLists: true,
    showMediaSession: true,
    responsive: true,
    remove: false,
    mode: 'full',
    theme: 'light',
    sortableOptions: {
      disabled: false,
    },
  };
  return (
    <div style={{ paddingBottom: 20 }}>
      {/* @ts-ignore:next-line */}
      <ReactJkMusicPlayer
        {...options}
        glassBg
        showMediaSession
        style={{ color: '#fff' }}
      />
    </div>
  );
};
export default AuidoRoute;
