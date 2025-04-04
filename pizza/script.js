// Ensure Supabase library is loaded before running this
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, initializing Supabase...");

    // Initialize Supabase
    const SUPABASE_URL = "https://vmlhluqmlpsjfbphmuda.supabase.co"; // Your Supabase URL
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbGhsdXFtbHBzamZicGhtdWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mjg4NTksImV4cCI6MjA1OTMwNDg1OX0.Fh6A_V6iacdVhYzRkgRlSzhOL7jxmGYUaEc5lhNeDQA"; // Your Supabase anon key

    // Create the client - this is the key change
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase initialized:", supabaseClient);

    // Function to handle form submission
    async function submitRSVP(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const pizza = document.getElementById("pizza").value;
        const drink = document.getElementById("drink").value;
        const slices = document.getElementById("slices").value;
        const drinks = document.getElementById("drink").value;
        const venmo = document.getElementById("venmo").value;
        
        try {
            const { data, error } = await supabaseClient
                .from('Pizza')  // Your table name in Supabase
                .insert([
                    { 
                        name, 
                        pizza: pizza, 
                        drink: drink, 
                        slices: slices, 
                        drink: drinks, 
                        venmo: venmo 
                    }
                ]);
                
            if (error) throw error;
            
            alert("Thanks for your RSVP!");
            document.getElementById("rsvpForm").reset();
            document.getElementById("modal").style.display = "none";
            
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("There was an error submitting your RSVP. Please try again.");
        }
    }

    // Attach event listener after initialization
    document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);
    
    // Add modal functionality
    const modal = document.getElementById("modal");
    const startButton = document.getElementById("startButton");
    const closeButton = document.querySelector(".close-button");
    
    startButton.addEventListener("click", () => {
        modal.style.display = "block";
    });
    
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
