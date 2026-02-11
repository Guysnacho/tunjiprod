import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { couponFetcher } from "@/lib";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  NumberInput,
  Spinner,
  Stack,
  Table,
  VStack,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const columns = [
  { name: "#" },
  { name: "COUPON NAME" },
  { name: "PROMO CODE" },
  { name: "% OFF" },
  { name: "$ OFF" },
  { name: "TIMES REDEEMED" },
  { name: "EXPIRES AT" },
  { name: "CREATED AT" },
  { name: "Manage" },
];

export const CouponCreator = () => {
  const [coupon, setCoupon] = useState<string | undefined>();
  const [couponName, setCouponName] = useState<string>("");
  const [discount, setDiscount] = useState("");
  const [percentage, setPercentage] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    "/admin/coupon",
    () => couponFetcher(),
    {
      onError(err) {
        toaster.error({
          title: "Issue fetching coupons",
          description: err.message,
        });
      },
    },
  );

  const createCoupon = async () => {
    const res = await fetch("/admin", {
      method: "POST",
      body: JSON.stringify(
        discount
          ? {
              couponName,
              discount: discount.includes("USD")
                ? Number(discount.split(" ")[1])
                : Number(discount),
            }
          : percentage
            ? { couponName, percentage: Number(percentage.replace("%", "")) }
            : {
                coupon,
              },
      ),
    });
    if (res.ok) mutate();
    else {
      const err = await res.json();
      toaster.error({
        title: "Issue creating coupon",
        description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
      });
    }
    resetFields();
  };

  const deletePromo = async (promo: string) => {
    try {
      const res = await fetch("/admin", {
        method: "DELETE",
        body: JSON.stringify({ promo }),
      });
      if (res.ok) mutate();
      else {
        const err = await res.json();
        toaster.error({
          title: "Issue deleting promo code",
          description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
        });
      }
    } finally {
      resetFields();
    }
  };

  const deleteCoupon = async (couponId: string) => {
    try {
      const res = await fetch("/admin", {
        method: "DELETE",
        body: JSON.stringify({ coupon: couponId }),
      });
      if (res.ok) mutate();
      else {
        const err = await res.json();
        toaster.error({
          title: "Issue deleting coupon code",
          description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
        });
      }
    } finally {
      resetFields();
    }
  };

  function resetFields() {
    setCoupon(undefined);
    setCouponName("");
    setDiscount("");
    setPercentage("");
  }

  return (
    <Stack direction={["column"]} gap={10} mx="auto" justify="space-around">
      <VStack justifyContent="center" textAlign="center">
        <Heading size="md">Create Coupon</Heading>
        <Box>
          <Field label="New Coupon Name">
            <Input
              type="text"
              inputMode="text"
              maxLength={40}
              onChange={(e) => setCouponName(e.currentTarget.value)}
              value={couponName}
            />
          </Field>
          <Flex gap={3}>
            <Field label="% off" disabled={!!discount}>
              <NumberInput.Root
                value={percentage}
                step={0.1}
                formatOptions={{
                  style: "percent",
                }}
                onValueChange={(e) => setPercentage(e.value)}
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field>
            {/* <Field label="$ off (whole numbers only)" disabled={!!percentage}>
              <NumberInput.Root
                value={discount}
                onValueChange={(e) => {
                  console.log(e.value);
                  setDiscount(e.value);
                }}
                step={1}
                formatOptions={{
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                  currencySign: "accounting",
                  unitDisplay: "narrow",
                  trailingZeroDisplay: "stripIfInteger",
                }}
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field> */}
          </Flex>
          <Heading my={5}>Or</Heading>
          <NativeSelect.Root>
            <NativeSelect.Field
              onChange={(e) => {
                setCoupon(e.currentTarget.value || undefined);
              }}
              value={coupon}
              placeholder="Select a coupon to duplicate"
            >
              {data &&
                data.length > 0 &&
                data.map((promo) => (
                  <option key={promo.promo_id} value={promo.coupon.id}>
                    Coupon Name - {promo.coupon.name || "null"} | Promo Code -{" "}
                    {promo.promo_code} | % off - {promo.coupon.percent_off}
                  </option>
                ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <Button
          colorPalette="green"
          disabled={(!couponName || (!percentage && !discount)) && !coupon}
          onClick={() => createCoupon()}
        >
          Submit
        </Button>
      </VStack>
      <VStack textAlign="center">
        <Heading size="md">Coupon List</Heading>

        {error ? (
          <></>
        ) : isLoading ? (
          <Spinner />
        ) : data ? (
          <Table.ScrollArea maxH={500} overflowY="auto">
            <Table.Root variant="outline" striped>
              <Table.Caption>
                {data.length
                  ? data.length + " coupons created"
                  : "No coupons available"}
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  {columns.map(({ name }) => (
                    <Table.ColumnHeader key={name}>{name}</Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data &&
                  data.map((couponItem, idx) => (
                    <Table.Row
                      key={idx}
                      display={!couponItem ? "none" : undefined}
                    >
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.name || "null"}
                      </Table.Cell>
                      <Table.Cell>{couponItem.promo_code}</Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.percent_off
                          ? `${couponItem.coupon.percent_off}%`
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.amount_off
                          ? `$${couponItem.coupon.amount_off}`
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.times_redeemed} /{" "}
                        {couponItem.coupon.max_redemptions}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.expires_at! <= 1743119940
                          ? "No Expiration Date"
                          : new Date(
                              couponItem.expires_at! * 1000,
                            ).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(couponItem.created).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Stack>
                          <Button
                            colorPalette="purple"
                            onClick={() => deletePromo(couponItem.promo_id)}
                            aria-label="Delete Promo Code"
                          >
                            <Trash2 />
                            Delete Promo Code
                          </Button>
                          <Button
                            colorPalette="red"
                            onClick={() => deleteCoupon(couponItem.coupon.id)}
                            aria-label="Delete Coupon"
                          >
                            <Trash2 />
                            Delete Coupon
                          </Button>
                        </Stack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        ) : (
          <></>
        )}
      </VStack>
    </Stack>
  );
};
