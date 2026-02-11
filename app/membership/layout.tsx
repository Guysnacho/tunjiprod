import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership | The Soapbox",
  description:
    "Join The Soapbox community. Access immersive installations, screenings, workshops, and exclusive events.",
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
