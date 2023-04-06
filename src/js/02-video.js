import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);
const CURRENT_TIME = 'videoplayer-current-time';
const THROTTLE_TIME = 1000;

const onPlay = function (data) {
  localStorage.setItem(CURRENT_TIME, Math.round(data.seconds));
};

player.on('timeupdate', throttle(onPlay, THROTTLE_TIME));

if (localStorage.getItem(CURRENT_TIME)) {
  const userPlaybackTime = localStorage.getItem(CURRENT_TIME);
  player.setCurrentTime(userPlaybackTime);
} else return;
