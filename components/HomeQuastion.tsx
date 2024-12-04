"use client";
import React from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HomeQuastion({
  headTitle = "هل لديك حلم ترغب في تحقيقه؟ دعنا نساعدك في تحويله إلى واقع ملموس مع خدماتنا المتميزة!",

  
}) {
  return (
    <Drawer.Root>
      <div className="relative w-full h-full">
        <Triger />
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 " />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[90%] sm:h-[70%] flex-col rounded-t-[10px] bg-zinc-100 ">
          <div className="flex-1 overflow-auto rounded-t-[10px] bg-primary-foreground p-4 ">
            <div className="mx-auto mb-8 w-12 flex-shrink-0 rounded-full bg-zinc-900 " />
            <DrawTItle headTitle={headTitle} />
            <DreamForm />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function DrawTItle({ headTitle }: { headTitle: string }) {
  return (
    <Drawer.Title className="mb-4 font-medium">
      <div className="mb-4 flex  flex-row justify-center items-center border-b-4 border-blueColor bg-yellowColor px-8 rounded-lg ">
        <h1 className="font-lateef  text-lg sm:text-xl text-blueColor">
          {headTitle}
        </h1>
      </div>
    </Drawer.Title>
  );
}

function Triger() {
  return (
    <Drawer.Trigger className="border-b-2 border-orangeColor w-full font-cairo text-sm md:text-xl bg-transparent rounded-none text-blueColor animate-bounce font-semibold">
      حقق حلمك واحصل علي خصم 20%
    </Drawer.Trigger>
  );
}

const DreamForm = () => {
  return (
    <form className="flex flex-col gap-4 border border-orangeColor p-4 w-full rounded-lg">
      <div className="flex sm:flex-row  flex-col w-full items-center justify-around gap-4">
        <div className="w-full">
          <p className="font-lateef font-semibold text-lg text-blueColor">
            رقم الجوال
          </p>
          <Input type="text" />
        </div>
        <div className="w-full">
          <p className="font-lateef font-semibold text-lg text-blueColor">
            الايميل
          </p>
          <Input type="text" />
        </div>
      </div>
      <div>
        <p className="font-lateef font-semibold text-lg text-blueColor">
          شرح مختصر عن الفكرة التي تود تحقيقها !
        </p>
        <Textarea   />
      </div>

      <Button className="bg-orangeColor w-[200px] font-cairo text-xl">
        ارسال الطلب
      </Button>
    </form>
  );
};
