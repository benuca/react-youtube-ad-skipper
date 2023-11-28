import { useQuery } from "react-query";
import axios from "axios";

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

  if (isFetching) return "Loading...";

  if (error) return "An error has occurred";

  const videoData = data.items[0].snippet;

  //console.log("data", data.items[0].snippet);

  return (
    <>
      <iframe
        width="1000px"
        height="600px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <p>{videoData.title}</p>
    </>
  );
}
