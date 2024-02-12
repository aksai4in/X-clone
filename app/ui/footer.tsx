import Link from "next/link";
import LoginLink from "./loginLink";

export default function Footer() {
  const links = [
    { name: "About", url: "https://about.twitter.com/" },
    {
      name: "Download the X app",
      url: "https://help.twitter.com/using-x/download-the-x-app",
    },
    { name: "Help Center", url: "https://help.twitter.com/" },
    { name: "Terms of Service", url: "https://twitter.com/tos" },
    { name: "Privacy Policy", url: "https://twitter.com/privacy" },
    {
      name: "Cookie Policy",
      url: "https://support.twitter.com/articles/20170514",
    },
    {
      name: "Accessibility",
      url: "https://help.twitter.com/resources/accessibility",
    },
    {
      name: "Ads info",
      url: "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
    },
    {
      name: "Blog",
      url: "https://blog.twitter.com/",
    },
    { name: "Status", url: "https://status.twitterstat.us/" },
    { name: "Careers", url: "https://careers.twitter.com/" },
    { name: "Brand Resources", url: "https://brand.twitter.com/" },
    { name: "Advertising", url: "https://ads.twitter.com/" },
    { name: "Marketing", url: "https://marketing.twitter.com/" },
    { name: "X for Business", url: "https://business.twitter.com/" },
    { name: "Developers", url: "https://developer.twitter.com/" },
    { name: "Directory", url: "https://twitter.com/i/directory/profiles" },
    { name: "Settings", url: "https://twitter.com/settings" },
  ];
  return (
    <div className="mt-auto ml-5 mr-5 bottom-0 my-5 flex  flex-wrap justify-center">
      {links.map((link: { name: string; url: string }) => (
        <LoginLink key={link.name} name={link.name} url={link.url} />
      ))}
    </div>
  );
}
