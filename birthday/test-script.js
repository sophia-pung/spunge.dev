console.log("Script loading...");

// Initialize Supabase client
const { createClient } = window.supabase;
const supabaseUrl = "https://dmdwjbpfhhvcythipkui.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZHdqYnBmaGh2Y3l0aGlwa3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NTI3MzMsImV4cCI6MjA1NjUyODczM30.m6RhufmYeZoOWGsJ65AlnnzudzW8BO2pSZ_STzzqv3I";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Function to update the character roster
  function updateRoster(characters = []) {
    console.log("Updating roster with:", characters);
    const characterGrid = document.getElementById("characterGrid");
    const playerCount = document.getElementById("playerCount");

    if (!characterGrid || !playerCount) {
      console.error("Required elements not found");
      return;
    }

    // Clear existing characters
    characterGrid.innerHTML = "";

    // Update player count
    const count = characters.length;
    playerCount.textContent = count;

    if (count === 0) {
      // Show example character
      const exampleCharacter = {
        name: "Sophie",
        character: "Princess Peach",
        backstory:
          "A skilled ruler of the Mushroom Kingdom who's not just about getting kidnapped anymore. Expert at tennis, golf, and kart racing. Ready to bring some royal flair to the party! 👑🍄",
        avatar:
          "https://upload.wikimedia.org/wikipedia/en/1/16/Princess_Peach_Stock_Art.png",
      };

      const exampleCard = document.createElement("div");
      exampleCard.className = "character-card example";
      exampleCard.innerHTML = `
        <div class="example-badge">EXAMPLE</div>
        <img src="${exampleCharacter.avatar}" class="character-avatar" alt="${exampleCharacter.character}">
        <div class="character-name">${exampleCharacter.character}</div>
        <div class="character-player">${exampleCharacter.name}</div>
        <div class="character-backstory">${exampleCharacter.backstory}</div>
      `;
      characterGrid.appendChild(exampleCard);
      playerCount.textContent = "0";
    } else {
      // Display actual characters
      characters.forEach((character) => {
        console.log("Processing character:", character);
        const characterCard = document.createElement("div");
        characterCard.className = "character-card";
        
        // Add a fallback image and error handling
        const avatarUrl = character.avatar || 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Character';
        console.log("Avatar URL:", avatarUrl);
        
        characterCard.innerHTML = `
          <img src="${avatarUrl}" class="character-avatar" alt="${character.character}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150/FF69B4/FFFFFF?text=Character';">
          <div class="character-name">${character.character}</div>
          <div class="character-player">Player: ${character.name}</div>
          <div class="character-backstory">${character.backstory || 'No backstory provided'}</div>
        `;
        characterGrid.appendChild(characterCard);
      });
    }
  }

  // Function to fetch and update responses
  async function fetchResponses() {
    console.log("Fetching responses...");
    try {
      const { data, error } = await supabase
        .from("birthday_rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching responses:", error);
        return;
      }

      console.log("Fetched responses:", data);
      updateRoster(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Test character data
  const testCharacters = [];

  // Initialize with empty roster
  updateRoster([]);

  // Fetch responses immediately
  fetchResponses();

  // Modal functionality
  const modal = document.getElementById("rsvpModal");
  const closeButton = document.querySelector(".close-button");
  const rsvpForm = document.getElementById("rsvpForm");
  const phoneInput = document.getElementById("phone");

  // Auto-format phone number as user types
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (!value.startsWith("1")) {
      value = "1" + value;
    }

    if (value.length > 0) {
      if (value.length <= 1) {
        value = "+1 ";
      } else if (value.length <= 4) {
        value = "+1 " + value.substring(1);
      } else if (value.length <= 7) {
        value = "+1 " + value.substring(1, 4) + "-" + value.substring(4);
      } else {
        value =
          "+1 " +
          value.substring(1, 4) +
          "-" +
          value.substring(4, 7) +
          "-" +
          value.substring(7, 11);
      }
    }
    e.target.value = value;
  });

  window.showRSVPModal = function () {
    modal.classList.add("show");
  };

  function closeRSVPModal() {
    modal.classList.remove("show");
  }

  // Close modal when clicking the close button or outside the modal
  closeButton.onclick = closeRSVPModal;
  window.onclick = function (event) {
    if (event.target === modal) {
      closeRSVPModal();
    }
  };

  // Handle form submission
  // Handle form submission
rsvpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "SENDING...";

  try {
    // Handle the image upload first
    const avatarFile = document.getElementById("avatar").files[0];
    let avatarUrl = "";

    if (avatarFile) {
      const fileName = `${Date.now()}_${avatarFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("character-avatar")
        .upload(fileName, avatarFile);

      if (uploadError) throw uploadError;

      // Retrieve the public URL
      const { data: publicUrlData } = supabase.storage
        .from("character-avatar")
        .getPublicUrl(fileName);

      avatarUrl = publicUrlData.publicUrl;
    }

    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value.trim(),
      character: document.getElementById("character").value,
      backstory: document.getElementById("backstory").value,
      drinkPlan: document.getElementById("drinkPlan").value,
      created_at: new Date().toISOString(),
      avatar: avatarUrl,
    };

    // Log the form data to inspect it
    console.log("Form Data:", formData);

    // Validate phone number format
    if (!formData.phone.match(/^\+1 [0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
      throw new Error(
        "Please enter a valid phone number in the format: +1 XXX-XXX-XXXX"
      );
    }

    const { data, error } = await supabase
      .from("birthday_rsvp")
      .insert([formData]);

    if (error) throw error;

    alert("Your character has been registered! See you at the party! 🎮");
    closeRSVPModal();
    rsvpForm.reset();
    fetchResponses(); // Refresh the guest list
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting your RSVP. Please try again!");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "CONFIRM ATTENDANCE";
  }
});
});