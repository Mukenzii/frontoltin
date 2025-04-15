import { createGlobalStyle } from 'styled-components';
import { get } from 'lodash';

export const GlobalStyle = createGlobalStyle`
body {
  background-color:${(props) => get(props, 'theme.palette.bgColor')} !important;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
    a {
      text-decoration: none !important;
    }
  }


.epub-highlight {
  fill-opacity: 0.3;
  mix-blend-mode: multiply;
	cursor: pointer;
	pointer-events: fill;
	transition: .1s ease-in-out;
}

.epub-highlight:hover {
	fill-opacity: 0.4;
}
.react-jinke-music-player-main.light-theme svg,.react-jinke-music-player-main.light-theme .audio-lists-panel .audio-item.playing,.react-jinke-music-player-main.light-theme .audio-item.playing .player-singer, .react-jinke-music-player-main.light-theme .audio-lists-panel .audio-item.playing svg{
  color:#3748A6 !important;
}
.react-jinke-music-player-main.light-theme .rc-switch-checked {
  background-color: #3748A6 !important;
  border: 1px solid #3748A6;
}
.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-track,.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle,.react-jinke-music-player-mobile-progress .rc-slider-track,.react-jinke-music-player-mobile-progress .rc-slider-handle {
  background-color: #3748A6 !important;
}
`;
export const loaderStyle = {
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  background: '#ffffffb8',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999999999999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const COLORS = {
  primary: '#1C1400',
  primaryVariant: '#FFC310',
  secondary: '#FFC310',
  textMain: '#242424',
  darkTextMain: 'rgba(255, 255, 255, 0.7)',
  success: '#64C962',
  gray: '#F5F5F5',
  stroke: '#EDEDED',
  darkGray: '#9A9A9A',
  white: '#fff',
  bg: '#fff',
  disabled: '#9A9A9A',
  border: '#E1E1E1',
  inputBackground: '#F8F8F8!important',
  lightBg: '#FFF6EB',
  darkBg: '#121212',
  darkDivider: 'rgba(255, 255, 255, 0.12)',
  divider: 'rgba(255, 255, 255, 0.12)',
  // darkBg: '#10182C',
  darkInput: '#1E2547',
  borderColor: '#F0F0F0',
};
