import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useRef, useTransition } from "react";

export default function LogoutDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const locale = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("logoutDialog");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isOpen ?? (
        <DialogTrigger asChild>
          <Button variant="destructive">{t("trigger")}</Button>
        </DialogTrigger>
      )}
      <DialogContent
        dir={locale === "en" ? "ltr" : "rtl"}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose ref={closeButtonRef} asChild>
              <Button variant={"secondary"}>{t("close")}</Button>
            </DialogClose>
            <form
              action={async () => {
                startTransition(async () => {
                  await logout();
                  if (closeButtonRef.current) closeButtonRef.current.click();
                });
              }}
            >
              <Button disabled={isPending} variant={"destructive"}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> {t("loading")}
                  </>
                ) : (
                  <>{t("confirm")}</>
                )}
              </Button>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
