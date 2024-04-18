import "./App.css";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

// Sample data
const tempMusicData = [
  {
    id: 1,
    title: "Harana",
    artist: "Parokya ni Edgar",
    genre: "Pop",
    rating: 4,
  },
  {
    id: 2,
    title: "Tabe",
    artist: "Carlos Agassi",
    genre: "Rock",
    rating: 3,
  },
  {
    id: 3,
    title: "Halik",
    artist: "Kamikaze",
    genre: "Rock",
    rating: 4,
  },
  {
    id: 4,
    title: "Dahil Sa'yo",
    artist: "Inigo Pascual",
    genre: "Pop",
    rating: 5,
  },
  {
    id: 5,
    title: "Narda",
    artist: "Kamikazee",
    genre: "Rock",
    rating: 3,
  },
  {
    id: 6,
    title: "Alapaap",
    artist: "Eraserheads",
    genre: "Alternative",
    rating: 4,
  },
  {
    id: 7,
    title: "Kisapmata",
    artist: "Rivermaya",
    genre: "Rock",
    rating: 5,
  },
];

// Sample playlist data
const tempPlaylist = [];

function App() {
  const [musics, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // Add song to playlist function
  function handleAddSongToPlaylist(music) {
    setPlaylist((prevPlaylist) => [...prevPlaylist, music]);
  }

  // Search functionality
  const filteredMusic = musics.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort music alphabetically by title
  const sortAlphabetically = () => {
    const sortedMusic = [...filteredMusic].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setMusic(sortedMusic);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <NavBar setSearchQuery={setSearchQuery} musicCount={musics.length} />
      <Main
        music={filteredMusic}
        playlist={playlist}
        onAddSong={handleAddSongToPlaylist}
        sortAlphabetically={sortAlphabetically}
      />
    </div>
  );
}

function NavBar({ setSearchQuery, musicCount }) {
  return (
    <nav className="container">
      <Logo />
      <Search setSearchQuery={setSearchQuery} />
      <NumberResult musicCount={musicCount} />
    </nav>
  );
}

function Logo() {
  return <h1>SeantiDope Music</h1>;
}

function Search({ setSearchQuery }) {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search songs..."
      onChange={handleSearch}
    />
  );
}

function NumberResult({ musicCount }) {
  return (
    <p>
      Total of <strong>{musicCount}</strong> Musics
    </p>
  );
}

function Music({ music, onAddSong, sortAlphabetically }) {
  return (
    <div className="containerM">
      <h2>
        Music List <i class="bi bi-music-note-beamed"></i>
      </h2>
      <ul>
        <button onClick={sortAlphabetically}>
          <i class="bi bi-sort-alpha-up"></i>
        </button>

        {music.map((music) => (
          <li key={music.id}>
            {music.title}
            by {music.artist} ({music.genre})
            <p>
              Rating:
              {music.rating}{" "}
            </p>
            <div className="btnAdd">
              <button className="add" onClick={() => onAddSong(music)}>
                <i class="bi bi-heart"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Playlist({ playlist }) {
  const totalSongs = playlist.length;

  return (
    <div className="containerM">
      <h2>
        Playlist <i class="bi bi-music-note-beamed"></i>
      </h2>
      <ul>
        <h4>Total Songs: {totalSongs}</h4>

        {playlist.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
            <p>
              <span>Rating: {music.rating}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Main({ music, playlist, onAddSong, sortAlphabetically }) {
  return (
    <div className="container">
      <Music
        music={music}
        onAddSong={onAddSong}
        sortAlphabetically={sortAlphabetically}
      />
      <Playlist playlist={playlist} />
    </div>
  );
}

export default App;
