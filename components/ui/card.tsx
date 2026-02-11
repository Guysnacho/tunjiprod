import { Card as ChakraCard } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface CardProps extends ChakraCard.RootProps {
  variant?: "elevated" | "outline" | "subtle"
}

export const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  function CardRoot(props, ref) {
    const { variant = "elevated", ...rest } = props
    return <ChakraCard.Root variant={variant} {...rest} ref={ref} />
  },
)

export const CardHeader = ChakraCard.Header
export const CardBody = ChakraCard.Body
export const CardFooter = ChakraCard.Footer
export const CardTitle = ChakraCard.Title
export const CardDescription = ChakraCard.Description
