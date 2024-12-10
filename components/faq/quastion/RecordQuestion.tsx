"use client";
import React, { useState } from "react";
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MicrophoneMessage from "@/components/icons/RecordIcon";
import AudioRecorder from "@/components/MicRecored";
import MdiMicrophoneMessage from "@/components/icons/RecordIcon";





export function RecordQuestion({
    selectedImage,
    altTitle,
}: {
    selectedImage: string | null;
    altTitle: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>

                    <MdiMicrophoneMessage width={34} height={34} />

                </Button>


            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col bg-secondary rounded-lg border border-primary text-center overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="hidden">Edit profile</DialogTitle>
                </DialogHeader>
                <AudioRecorder uploadUrl="https://api.dreamto.app/api/upload" maxRecordingTime={10} />
            </DialogContent>
        </Dialog>
    );
}

