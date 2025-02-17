
async function NotificationFetch() {
    // Show the popup
    document.getElementById("popup").style.display = "block";
    
    // Change content to "Loading..." until data is fetched
    document.getElementById("popup-content").innerHTML = "Loading...";

    try {
        const response = await fetch(`/users/notifications`);
        const data = await response.json();

        // Clear previous content
        const popupContent = document.getElementById("popup-content");
        popupContent.innerHTML = "";

        // Check if there are notifications
        if (data.notifications && data.notifications.length > 0) {
            data.notifications.forEach(notification => {
                // Create an element for each notification
                const notificationElement = document.createElement("div");
                notificationElement.innerHTML = `
                    <h6>${new Date(notification.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
                    <p>${notification.message || "No message available"}</p>
                    <hr>
                `;
                popupContent.appendChild(notificationElement);
            });
        } else {
            popupContent.innerHTML = "<p>No notifications available.</p>";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("popup-content").innerHTML = "<p>Error loading data.</p>";
    }
}


const popup= document.getElementById('popup');
const popupButton= document.getElementById('popupButton');

document.addEventListener("click", (event) => {
      if (!popup.contains(event.target) && !popupButton.contains(event.target)) {
        popup.style.display = "none";
      }
    });
  
