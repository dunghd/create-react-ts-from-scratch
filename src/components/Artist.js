import React from "react";

const Artist = () => {
  const [artist, setArtist] = React.useState("");
  const [listArtists, setListArtist] = React.useState([]);

  const listArtistDOM = listArtists.map((artist) => {
    return (
      <li style={{ listStyleType: "none", width: "50%", flex: "1 0 50%" }}>
        <img src={artist.image[0][`#text`]}></img>
        {artist.name} - {artist.listeners}
      </li>
    );
  });

  const searchHandler = () => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=017b293ec17b6385800ab21ebd8f8404&format=json`
    )
      .then((res) => res.json())
      .then((json) => {
        const artistResp = json.results.artistmatches.artist;
        console.log(artistResp);

        setListArtist(artistResp);
      });
  };

  return (
    <>
      <input
        type="text"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
      ></input>
      <button onClick={searchHandler}>Search</button>
      <br />
      <ul style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {listArtistDOM}
      </ul>
    </>
  );
};

export default Artist;
