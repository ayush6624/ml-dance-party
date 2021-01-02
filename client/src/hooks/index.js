import { useState, useEffect } from 'react';
import { token } from '../lib/constants';

export const useSpotify = () => {
  const [spotifyPlayer, setSpotifyPlayer] = useState();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        token: "BQA7qaj2FQjnn1oaAQ6iZWFevM6O3ZgapKdlhG-Xui-CpXYXiPajfy0aWcANiP6-gXE5XdyF-Cky3ao2Vndo0bsZiePgw7OxO1C9v6wLSAB0ic5NnXJR712n0ghQoJXHBgvAi5BkXKsqabdyxqUcGCqlb6fzK7aIRPQtCD9icbiWfqvq94Q",
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      setSpotifyPlayer(player);

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', (state) => {
        console.log(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
    return () =>
      (window.onSpotifyWebPlaybackSDKReady = () => {
        spotifyPlayer.disconnect();
      });
  });

  return { spotifyPlayer, setSpotifyPlayer };
};
