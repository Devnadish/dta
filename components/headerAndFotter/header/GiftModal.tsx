"use client";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedBorderTrail from "../../AnimatedBorderTrail";
import { useLocale, useTranslations } from "next-intl";
import { Gift, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import TypingText from "../../ui/AnimateText";
import { submitFreeGift } from "@/actions/freeGift/getGift";
import { ScrollArea } from "@/components/ui/scroll-area";
import Alert from "@/components/Alert";

export default function GiftModal({
  modalSize = "lg",
}: {
  modalSize?: "sm" | "lg";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage");
  return (
    <>
      <AnimatedBorderTrail
        trailSize="lg"
        duration={"7s"}
        trailColor="orange"
        className=" flex items-center justify-center  w-[70px]"
      >
        <button
          className="font-bold font-cairo gap-4 flex p-1 items-center justify-center   text-center w-full text-foreground bg-background "
          onClick={() => setIsOpen(true)}
        >
          {/* {t("free")} */}
          <Gift className="animate-pulse" size={24} />
        </button>
      </AnimatedBorderTrail>

      <div className="fixed top-16 left-0 w-full z-50 ">
        <AnimatePresence mode="wait">
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed top-0 left-0   z-50 flex cursor-pointer items-center justify-center w-screen h-s  bg-slate-900/20 p-8 backdrop-blur "
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                initial={{ scale: 0, rotate: "180deg" }}
                animate={{
                  scale: 1,
                  rotate: "0deg",
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                  },
                }}
                exit={{ scale: 0, rotate: "180deg" }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
                className={cn(
                  "relative w-full max-w-lg cursor-default overflow-hidden rounded-xl  bg-foreground py-2 px-4  shadow-2xl ",
                  {
                    "max-w-sm": modalSize === "sm",
                  }
                )}
              >
                <ModalActions setIsOpen={setIsOpen} />
                <ModalContent modalSize={modalSize} />
                <RegisterForm />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const ModalContent = ({ modalSize }: { modalSize: "sm" | "lg" }) => {
  const t1 = useTranslations("Free");
  const t2 = useTranslations("HomePage");
  const locale = useLocale(); // Cast to the correct type
  const direction = locale === "ar" ? "rtl" : "ltr";
  const data = [
    {
      id: "consultation",
      title: t1("consultation"),
      subtitlex: t1("consultationTitle"),
      href: "/services/evaluation",
    },
    {
      id: "evaluation",
      title: t1("evaluation"),
      subtitlex: t1("evaluationTitle"),
      href: "/services/idea",
    },

    {
      id: "firstPurchaseDiscount",
      title: t1("firstPurchaseDiscount"),
      subtitlex: t1("firstPurchaseDiscountTitle"),
      href: "/services/digital-marketing",
    },
    {
      id: "referralProgram",
      title: t1("referralProgram"),
      subtitlex: t1("referralProgramTitle"),
      href: "/services/email-marketing",
    },
  ];
  return (
    <div className="flex flex-col gap-1">
      <TypingText
        text={t1("animatedMsg")}
        className="text-xs sm:text-sm lg:text-lg text-orangeColor font-bold font-cairo"
        grow={true}
      />

      <div className="flex flex-row items-center justify-between gap-1">
        <h3
          className={cn(
            "text-start text-xs sm:text-base md:text-xl font-bold text-blueColor font-cairo mb-1",
            {
              "text-base": modalSize === "sm",
            }
          )}
        >
          {t1("WelcomeMsg")}{" "}
          <span className="text-orangeColor">{t2("dreamtoApp")}!</span>
        </h3>
        <p className="text-xs sm:text-base md:text-lg  font-tajawalLight text-foreground font-bold bg-blueColor rounded-xl py-1 px-2">
          {locale === "ar" ? "اربع هدايا" : "Four Gift"}
        </p>
      </div>
      <ScrollArea
        className="h-48 w-full rounded-md border p-2"
        dir={direction}
        type="always"
      >
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col text-background font-cairo items-start justify-center hover:bg-yellowColor hover:text-blueColor rounded-lg border border-gray-200 p-1 "
            >
              <div className="flex flex-row items-center justify-center gap-2 font-tajawal">
                <p className="text-sm font-semibold font-tajawal">
                  {item.title}
                </p>
              </div>
              <p className="text-xs font-light  font-tajawalLight">
                {item.subtitlex}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const ModalActions = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="flex gap-2 mt-4  items-center justify-between w-full">
      <button
        onClick={() => setIsOpen(false)}
        className=" w-full rounded bg-transparent py-2 font-semibold text-destructive transition-colors hover:bg-white/30"
      >
        <X className="w-4 h-4" />
      </button>
      <Gift className="mx-auto text-orangeColor" size={24} />
    </div>
  );
};

const RegisterForm = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [state, formAction, isPending] = useActionState(submitFreeGift, null);
  const t1 = useTranslations("Free");

  return (
    <div className="relative">
      <form
        action={formAction}
        className=" flex flex-col gap-2 bg-white p-4 rounded-lg mt-4 border border-border"
      >
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="Phone"
            name="mobile"
            className="text-black"
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            // required
            className="text-black"
          />
        </div>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          // required
          className="text-black"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full font-tajawal flex text-wrap p-1 text-xs sm:text-base md:text-xl"
        >
          {t1("animatedMsg")}
        </Button>
      </form>

      {state && !isPending && (
        <Alert isVisible={true} message={state?.message} />
      )}
    </div>
  );
};
