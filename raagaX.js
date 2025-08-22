document.addEventListener('DOMContentLoaded', function () {
    // Get all sections and menu links
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll("nav .menu-item a");

    // Function to show the target section and hide others
    const showSection = (targetId) => {
        sections.forEach((section) => {
            section.style.display = section.id === targetId ? "block" : "none";
        });
    };

    // Add click event listeners to all menu links
    menuLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            showSection(targetId);
        });
    });

    // Show the Home section by default on page load
    showSection("Home");

    // **Toggle visibility of the "Artists" section**
    const toggleButton = document.getElementById("toggle-artists");
    const artistsSection = document.getElementById("Artists");

    // Check if toggle button and artists section exist
    if (toggleButton && artistsSection) {
        toggleButton.addEventListener("click", () => {
            // Toggle visibility of the entire artist section
            artistsSection.classList.toggle("hidden");
        });
    } else {
        console.error("Toggle button or artists section is missing!");
    }

    // **Artist Name as Toggle Button**
    const artistButtons = document.querySelectorAll(".artist-name");

    // Loop through each artist name and add a click event listener
    artistButtons.forEach((artistButton) => {
        artistButton.addEventListener("click",() => {
            const songList = artistButton.closest('.glass').querySelector('.song-list');  // Get the associated song list (the next sibling element)
            const toggleButton = document.querySelector('.toggle-button');
            console.log(songList); // Check if the correct song list is selected
            // Toggle visibility of the song list for this artist
            songList.classList.toggle("hidden");
            toggleButton.addEventListener('click', () => {
                songList.classList.toggle('visible');
                songList.classList.toggle('hidden');
            });
            if (songList) {
                // Toggle visibility of the song list
                songList.classList.toggle("hidden");
                songList.classList.toggle('visible');
                // Optionally, hide other song lists when one is opened
                document.querySelectorAll(".song-list").forEach((list) => {
                    if (list !== songList) {
                        list.classList.add("hidden");
                    }
                });
            } else {
                console.error("No song list found for this artist!");
            }});
    });

    // **Audio Player and Lyrics Functionality**
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play-button");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    // const lyricsDisplay = document.getElementById("lyrics-display");

    let currentSongs = [];
    let currentSongIndex = 0;

    // Function to fetch lyrics from text files
    // const fetchLyrics = async (songName) => {
    //     try {
    //         const response = await fetch(`./lyrics/${songName}.txt`);
    //         if (!response.ok) throw new Error("Lyrics not found");
    //         return await response.text();
    //     } catch (error) {
    //         console.error("Error fetching lyrics:", error);
    //         return "Lyrics not available for this song.";
    //     }
    // };

    // Function to play song and display lyrics
    const playSongWithLyrics = async (songName, songSrc) => {
        console.log("Playing song:", songName, "Source:", songSrc);
        // Show Home section and hide Artists section
        showSection("Home");
        // Stop the current song before starting a new one
         audioPlayer.pause();
         audioPlayer.currentTime = 0;  // Reset the current time of the song
        // Update audio player and play song
        audioPlayer.src = songSrc;  // Use the existing audioPlayer element
        console.log("Audio player source set:", audioPlayer.src);
        // Ensure the audio player is ready to play
         audioPlayer.load(); // Re-load the audio element to ensure the new source is set
        audioPlayer.play().then(() => {
            playButton.textContent = "Pause";
        }).catch((error) => {
            console.error("Error playing audio:", error);
        });

        // Fetch and display lyrics
        // const lyrics = await fetchLyrics(songName);
        // lyricsDisplay.textContent = lyrics;

         
    };

    // Add click event listeners to each song item
    const songItems = document.querySelectorAll(".song-list li");
    songItems.forEach((songItem) => {
        songItem.addEventListener("click", function () {
            // Highlight the selected song
            const songList = this.closest(".song-list");
            songList.querySelectorAll("li").forEach((li) => li.classList.remove("playing"));
            this.classList.add("playing");

            const songName= this.textContent.trim();
            const songSrc = this.dataset.src;

            // Add the selected song to the currentSongs array if not already present
        if (!currentSongs.some(song => song.name === songName)) {
            currentSongs.push({ name: songName, src: songSrc });
        }

        // Play the song with lyrics
        playSongWithLyrics(songName, songSrc);
            // Play song and show lyrics
            // const songName = this.textContent.trim();
            // const songSrc = this.dataset.src;
            // playSongWithLyrics(songName, songSrc);
        });
    });

//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
    // Add play/pause functionality to the play button
    playButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playButton.textContent = "Play";
        }
    });

    // Next song functionality
    nextButton.addEventListener("click", function () {
        if (currentSongs.length === 0) {
            alert("No songs available to play.");
            return;
        }
            // Stop the current song before playing the next one
         audioPlayer.pause();
         audioPlayer.currentTime = 0;  // Reset the current time of the song
        currentSongIndex = (currentSongIndex + 1) % currentSongs.length;
        const { name, src } = currentSongs[currentSongIndex];
        playSongWithLyrics(name, src);
    });

    // Previous song functionality
    prevButton.addEventListener("click", function () {
        if (currentSongs.length === 0) {
            alert("No songs available to play.");
            return;
        }
        audioPlayer.pause();
         audioPlayer.currentTime = 0;  // Reset the current time of the song
        currentSongIndex = (currentSongIndex - 1 + currentSongs.length) % currentSongs.length;
        const { name, src } = currentSongs[currentSongIndex];
        playSongWithLyrics(name, src);
    });

    // Reset play button when song ends
    audioPlayer.addEventListener("ended", function () {
        playButton.textContent = "Play";
    });
});