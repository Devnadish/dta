import { getTranslations } from "next-intl/server";

const MustLogin = async () => {
  const t = await getTranslations();
  return (
    <div className="bg-primary px-2 py-1 rounded-md font-cairo">
      {t("login.mustLogin")}
    </div>
  );
};
export default MustLogin;
