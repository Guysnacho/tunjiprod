import { Card } from "@chakra-ui/react";

export default function EmbeddedVideo(
  props: { src: string; className?: string | undefined } & Card.RootProps
) {
  const { src, ...cardProps } = props;
  return (
    <Card.Root {...cardProps}>
      <Card.Body>
        <iframe
          className="mx-auto"
          src={src}
          width="100%"
          allow="autoplay"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </Card.Body>
    </Card.Root>
  );
}
