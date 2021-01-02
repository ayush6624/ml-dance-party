import { useState, useEffect } from "react";

export const useSpotify = () => {
    const [spotifyPlayer, setSpotifyPlayer] = useState();

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = '[BQDiGOBYvLBNod_OrJ1ggZArEQ12rOIIU6rT52-ZZQxLXxX_wBDueAoXkzdeKKhn_U--iIJv3PdbDX_C_kjWgPXr_QGsECqv0wmaeM6hcbRh8mcm8Whv1m6RyD3ZNisSDVjth-RyE1lM3XWKAHqIVCLHpp3lvK5N3Ob-QjEvnTuOQAr5w5s]';
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });
            setSpotifyPlayer(player);

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

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
            window.onSpotifyWebPlaybackSDKReady = () => {
                spotifyPlayer.disconnect();
            }
    });

    return { spotifyPlayer, setSpotifyPlayer };
}
