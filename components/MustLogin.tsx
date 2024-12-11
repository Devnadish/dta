import { getTranslations } from "next-intl/server";

const MustLogin = async () => {
  const t = await getTranslations();
  return (
    <div className="text-foreground  ">
      {t("login.mustLogin")}
    </div>
  );
};
export default MustLogin;
