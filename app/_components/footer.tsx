import { cn } from "@/lib/utils";
import Link from "next/link";
import { APP_NAME } from "@/utils/consts";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa6";
import { buttonVariants } from "@/components/ui/button";

const socialList = [
  {
    link: "https://github.com/taishikato/autonomics",
    icon: FaGithub,
    title: "Check our GitHub",
  },
  {
    link: "https://discord.gg/7phSe9rJm3",
    icon: FaDiscord,
    title: "Check our Discord server",
  },
  {
    link: "https://twitter.com/taishik_",
    icon: FaTwitter,
    title: "Check our Twitter",
  },
];

export const Footer = ({ className }: { className?: string }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "h-full md:h-auto py-5 border-t w-full z-50 text-gray-100",
        className
      )}
    >
      <div className="max-w-7xl px-6 lg:px-8 flex mt-6 py-6 mx-auto md:px-0 flex-col md:flex-row gap-x-0 md:gap-x-8 gap-y-5 md:gap-y-0 text-gray-300">
        <div>
          <p className={cn("text-sm mb-2")}>
            <>
              © {year} {APP_NAME}. All rights reserved.
            </>
          </p>

          <div className="flex">
            {socialList.map((social) => {
              return (
                <a
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
