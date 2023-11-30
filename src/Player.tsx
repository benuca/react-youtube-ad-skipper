import { useMemo } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function Player() {
  const params = new URLSearchParams(window.location.search);

  const videoId: string | null = params.get("v")
    ? params.get("v")
    : "jfKfPfyJRdk";

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

  return (
    <>
      <h1>{videoData ? videoData.title : "Loading title..."}</h1>
      <iframe
        height="600px"
        width="900px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <div className="mid">
        <pre>
          {isFetching
            ? "Loading Description..."
            : error
            ? "Error loading Description"
            : videoData.description}
        </pre>
      </div>
      <div>
        <hr></hr>
        <p>
          <b>Instructions:</b>
        </p>
        <ol>
          <li>Drag link onto bookmarks bar</li>
          <li>Watch videos on youtube</li>
          <li>If ads appear, click bookmark</li>
        </ol>
        <p>
          Drag onto bookmarks bar 👉 &nbsp;
          <a href="javascript:(function(){window.location.href = window.location.href.replace('www.youtube.com/watch', 'benuca.github.io/react-youtube-ad-skipper/');})();">
            Play without ads
          </a>
        </p>
      </div>
    </>
  );
}
