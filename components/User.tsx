import { Avatar } from "@/components/ui/avatar";
import { Database } from "@/lib/supabase/types";
import { Box, Flex, Text } from "@chakra-ui/react";

type RoleProp =
  | Database["public"]["Tables"]["member"]["Row"]["role"]
  | undefined
  | null;

export const User = ({
  fname,
  lname,
  role,
}: {
  fname: string | undefined | null;
  lname: string | undefined | null;
  role: RoleProp;
}) => {
  const deriveRole = (role: RoleProp) => {
    switch (role) {
      case "admin":
        return "MCBIOS Admin";
      case "professional":
        return "MCBIOS Professional";
      case "postdoctorial":
        return "MCBIOS Postdoctorial";

      default:
        return "MCBIOS Member";
    }
  };
  return (
    <Flex>
      <Avatar src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75" />
      <Box ml="3">
        <Text fontWeight="bold">
          {fname} {lname}
        </Text>
        <Text fontSize="sm">{deriveRole(role)}</Text>
      </Box>
    </Flex>
  );
};
