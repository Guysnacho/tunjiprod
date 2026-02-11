import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Soapbox | A Music & Art Conference by Tunji Productions",
  description:
    "The Soapbox is a sci-fi themed Music & Art Conference exploring 4D artforms and 5D film. Join us for immersive installations, screenings, workshops, and performances that push the boundaries of creative expression.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Nav />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
