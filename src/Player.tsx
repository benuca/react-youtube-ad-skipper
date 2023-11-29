import { useQuery } from "react-query";
import axios from "axios";
import { useMemo } from "react";

export default function Player() {
  const videoId: string | null = new URLSearchParams(
    window.location.search
  ).get("v");

  const { error, data, isFetching } = useQuery({
    queryKey: ["youtubeData"],
    queryFn: () =>
      axios
        .get(
          `https://yt.lemnoslife.com/noKey/videos?part=snippet&id=${videoId}`
        )
        .then((res) => res.data),
  });

  const videoData = useMemo(() => {
    if (!isFetching && !error && data && data.items && data.items.length > 0) {
      return data.items[0].snippet;
    }
    return null;
  }, [data, error, isFetching]);

  // console.log("query data --> ", data, error, isFetching);

  return (
    <>
      <iframe
        width="1300px"
        height="700px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <h2>{videoData ? videoData.title : "Loading title..."}</h2>
      <br />
      <br />
      <h3>
        {isFetching
          ? "Loading Description..."
          : error
          ? "Error loading Description"
          : videoData.description}
      </h3>
    </>
  );
}
