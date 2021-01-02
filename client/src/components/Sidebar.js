import React from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Video } from "./Video"
import { useState } from "react";
import { useSpotify } from '../hooks';

export const Sidebar = () => {

    const { spotifyPlayer } = useSpotify();
    const [paused, setPaused] = useState(true);

    return (
        <section className="sidebar">
            <Video />
            <div className="song-controls">
                <FaStepBackward
                    onClick={() => {
                        spotifyPlayer.previousTrack()
                    }}
                />
                {paused
                    ? <FaPlay
                        onClick={() => {
                            setPaused(false);
                            spotifyPlayer.resume()
                        }}
                    />
                    : <FaPause
                        onClick={() => {
                            setPaused(true);
                            spotifyPlayer.pause()
                        }}
                    />
                }
                <FaStepForward
                    onClick={() => {
                        spotifyPlayer.nextTrack()
                    }}
                />
            </div>
        </section>
    )
}