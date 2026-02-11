"use client";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const VideoUploader = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [video, setVideo] = useState("");
  const [videoError, setVideoError] = useState("");
  const [vidList, setVidList] =
    useState<Database["public"]["Tables"]["videos"]["Row"][]>();
  const [loading, setLoading] = useState(false);

  const client = createClient();

  useEffect(() => {
    console.debug("Video Selected");
    console.debug(video);
  }, [video]);

  const isValidUpload = () => {
    setDateError("");
    setTitleError("");
    setVideoError("");
    setLoading(true);
    if (!date) setDateError("Invalid date");
    if (!title || title === "") setTitleError("Invalid title");
    if (!video || video.length === 0) {
      setVideoError("Invalid video");
    }
    console.debug(dateError);
    console.debug(titleError);
    console.debug(videoError);
    return dateError === "" && titleError === "" && videoError === "";
  };

  const handleSubmit = async () => {
    const isValid = isValidUpload();
    if (!isValid) {
      setLoading(false);
      toaster.warning({
        title: "Bad upload Request",
        duration: 5000,
      });
      throw new Error();
    }
    // Insert entry into video table
    // TODO make a trigger and function for this, needs to be scopped down to content table though

    // Add reference to video in db
    const { data, error } = await client
      .from("videos")
      .insert({
        title,
        date: date!.toISOString(),
        path: video,
        org_id: process.env.NEXT_PUBLIC_ORG_ID,
      })
      .select()
      .single();

    if (data) {
      setVidList(vidList?.concat(data));
      toaster.success({
        title: "Mission accomplished",
        duration: 5000,
      });
    } else if (error) {
      toaster.error({
        title: "Something went wrong",
        description: error.message,
        duration: 5000,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="w-[300px] sm:w-1/3">
      <div className="space-y-5">
        <Stack gap={2}>
          <Text mt={3} mb={-5}>
            Conference Date
          </Text>
          <DatePicker
            className="max-w-[284px] mt-4"
            selected={date}
            maxDate={new Date()}
            onChange={setDate}
          />
          <Text>{dateError}</Text>
        </Stack>

        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="Title"
            id="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Speaker Series II"
            disabled={loading}
          />
          <Text>{titleError}</Text>
        </div>

        <div>
          <label htmlFor="video">Content Url</label>
          <Input
            type="text"
            name="Content Url"
            id="content"
            onChange={(e) => {
              setVideo(e.target.value);
            }}
            placeholder="drive.google.com/file/d/asdf1234/preview"
            disabled={loading}
          />
          <Text>{videoError}</Text>
        </div>

        <Flex justify="center">
          <Button
            colorPalette={
              dateError || titleError || videoError ? "red" : "green"
            }
            onClick={() => handleSubmit().catch((err) => console.error(err))}
          >
            Submit
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default VideoUploader;
