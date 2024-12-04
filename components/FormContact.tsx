"use client";
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

import { useTranslations } from "next-intl";
import { submitContact } from "@/actions/constactus/submitContact";
import { SendingToserver } from "./Loader";
import { NotifyMsg } from "./NotifyMsg";
export default function FormContact({
  lang,
  user,
}: {
  lang: string;
  user: any;
}) {
  const t = useTranslations("contactus");
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const savedRef = React.useRef();
  const formSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, t("mobileValidationError")),
    email: z.string().email(t("emailValidationError")),
    message: z.string().min(10, t("msgValidationError")),
  });

  // function validate() {
  //   try {
  //     const formData = { mobile, email, message };
  //     formSchema.parse(formData);
  //     return true;
  //   } catch (err) {
  //     if (err instanceof z.ZodError) {
  //       const fieldErrors = err.errors.reduce(
  //         (acc, curr) => {
  //           acc[curr.path[0]] = curr.message;
  //           return acc;
  //         },
  //         {} as Record<string, string>
  //       );
  //     }
  //     return false;
  //   }
  // }

  return (
    <>
      <form
        action={formAction}
        className="border border-orangeColor/50 p-4 rounded-lg gap-4 flex flex-col"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputContact
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="1234567890"
            className="text-sm sm:text-base text-foreground"
            labelName={t("mobile")}
          />
          <InputContact
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user.firstName}
            className="text-sm sm:text-base text-foreground"
            labelName={t("name")}
          />
          <InputContact
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
            className="text-sm sm:text-base text-foreground"
            labelName={t("email")}
          />
        </div>

        <div>
          <label className="text-sm sm:text-base text-orangeColor font-cairo">
            {t("msg")}
          </label>
          <Textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("msgplaceHolder")}
            className="min-h-[100px] text-sm sm:text-base text-foreground"
          />
        </div>
        <Button
          type="submit"
          className="w-full text-sm sm:text-base py-2 sm:py-3 "
          disabled={isPending}
        >
          {isPending ? <SendingToserver /> : t("sendBtn")}
        </Button>
      </form>
      {state && (
        <NotifyMsg
          title={t("Done")}
          msg={t("doneMsg")}
          open={isPending}
          onOpenChange={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

const InputContact = ({
  name,
  value,
  onChange,
  placeholder,
  className,
  labelName,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className: string;
  labelName: string;
}) => {
  return (
    <div>
      <label className="text-sm sm:text-base text-orangeColor font-cairo">
        {labelName}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};
