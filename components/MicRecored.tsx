import React, { useState, useRef, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { Button } from './ui/button';
import { Mic, StopCircle, Trash, Upload } from 'lucide-react';

interface AudioRecorderProps {
    uploadUrl: string; // Presigned URL for S3 upload
    maxRecordingTime: number; // Maximum recording time in seconds
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ uploadUrl, maxRecordingTime }: { uploadUrl: string, maxRecordingTime: number }) => {
    const [recording, setRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (recording) {
            setRecordingTime(0);
            recordingTimeoutRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);

            // Stop recording after max time
            const stopTimeout = setTimeout(stopRecording, maxRecordingTime * 1000);

            return () => {
                clearInterval(recordingTimeoutRef.current!);
                clearTimeout(stopTimeout);
            };
        }
    }, [recording, maxRecordingTime]);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
        if (recordingTimeoutRef.current) {
            clearInterval(recordingTimeoutRef.current);
        }
    };

    const onStop = (blob: { blob: Blob }) => {
        setRecordedBlob(blob.blob);
    };

    const uploadAudio = async () => {
        if (!recordedBlob) return;

        const formData = new FormData();
        formData.append('file', recordedBlob, 'recording.wav');

        try {
            const response = await axios.put(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'audio/wav',
                },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const removeRecording = () => {
        setRecordedBlob(null);
        setRecordingTime(0);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-2">
            <ReactMic
                record={recording}
                className="sound-wave rounded-md h-12 w-full "
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#3D3A3BFF"
            />
            <div className="flex flex-row items-center justify-between w-full text-xs">
                <p>Recording Time: {recordingTime}s</p>
                <p>Max Time: {maxRecordingTime}s</p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <Button onClick={startRecording} disabled={recording}>
                    <Mic />
                </Button>
                <Button onClick={stopRecording} disabled={!recording}>
                    <StopCircle />
                </Button>
                <Button onClick={uploadAudio} disabled={!recordedBlob}>
                    <Upload />
                </Button>
                <Button onClick={removeRecording} disabled={!recordedBlob}>
                    <Trash />
                </Button>
            </div>

            {recordedBlob && <audio controls src={URL.createObjectURL(recordedBlob)} />}
        </div>
    );
};

export default AudioRecorder;