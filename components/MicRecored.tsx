import React, { useState, useRef, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { Button } from './ui/button';
import { Mic, StopCircle, Trash, Upload, Play, Pause } from 'lucide-react';

interface AudioRecorderProps {
    uploadUrl: string;
    maxRecordingTime: number;
    onRecordingComplete?: (blob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
    uploadUrl, 
    maxRecordingTime,
    onRecordingComplete 
}) => {
    const [recording, setRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (recording) {
            setRecordingTime(0);
            recordingTimeoutRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (prev >= maxRecordingTime) {
                        stopRecording();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else if (recordingTimeoutRef.current) {
            clearInterval(recordingTimeoutRef.current);
        }

        return () => {
            if (recordingTimeoutRef.current) {
                clearInterval(recordingTimeoutRef.current);
            }
        };
    }, [recording, maxRecordingTime]);

    useEffect(() => {
        // Cleanup audio URL when component unmounts
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    const startRecording = () => {
        setRecording(true);
        setRecordedBlob(null);
        setAudioUrl(null);
        setIsPlaying(false);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onStop = (recordedData: { blob: Blob; blobURL: string }) => {
        setRecordedBlob(recordedData.blob);
        setAudioUrl(URL.createObjectURL(recordedData.blob));
        if (onRecordingComplete) {
            onRecordingComplete(recordedData.blob);
        }
    };

    const handleUpload = async () => {
        if (!recordedBlob) return;

        try {
            const formData = new FormData();
            formData.append('audio', recordedBlob);
            await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle successful upload
        } catch (error) {
            // Handle upload error
            console.error('Upload failed:', error);
        }
    };

    const clearRecording = () => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setRecordedBlob(null);
        setAudioUrl(null);
        setRecordingTime(0);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const togglePlayback = () => {
        if (!audioRef.current || !audioUrl) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <ReactMic
                    record={recording}
                    className="w-full h-12 rounded border"
                    onStop={onStop}
                    strokeColor="#000000"
                    backgroundColor="#ffffff"
                />
                <div className="flex-shrink-0 flex gap-2">
                    {recording ? (
                        <Button
                            onClick={stopRecording}
                            variant="destructive"
                            size="icon"
                            title="Stop recording"
                        >
                            <StopCircle className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={startRecording}
                            variant="outline"
                            size="icon"
                            disabled={recordingTime >= maxRecordingTime}
                            title="Start recording"
                        >
                            <Mic className="h-4 w-4" />
                        </Button>
                    )}
                    {audioUrl && !recording && (
                        <>
                        <Button
                            onClick={togglePlayback}
                            variant="outline"
                            size="icon"
                            title={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>
                        <Button 
                        onClick={clearRecording} 
                        variant="outline"
                            size="icon"
                            title={"clear"}
                    >
                        <Trash className="h-4 w-4  text-destructive"  />
                    </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Hidden audio element for playback */}
            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={handleAudioEnded}
                    className="hidden"
                />
            )}

           
            <div className="text-sm text-gray-500">
                Recording time: {recordingTime}s / {maxRecordingTime}s
            </div>
        </div>
    );
};

export default AudioRecorder;