
const contact = {
    firstName: "Hibatallah",
    lastName: "El Hamidy",
    phone: "+212 7 71 75 61 81",
    email: "example@gmail.com",
    linkedin: "https://www.linkedin.com/in/TON-PROFIL",
    instagram: "https://www.instagram.com/TON-COMPTE"
};

// 1. Enregistrer le contact
function saveContact() {

    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${contact.lastName};${contact.firstName};;;`,
        `FN:${contact.firstName} ${contact.lastName}`,
        `TEL;TYPE=CELL:${contact.phone}`,
        `EMAIL:${contact.email}`,
        `URL;TYPE=LinkedIn:${contact.linkedin}`,
        `URL;TYPE=Instagram:${contact.instagram}`,
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob(
        [vcard],
        { type: "text/vcard;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Hibatallah-El-Hamidy.vcf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// 2. Partager la carte
async function shareCard() {

    const data = {
        title: "Hibatallah El Hamidy",
        text: "Voici ma carte de visite digitale.",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(data);
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(data.url);
            alert("Lien copié !");
        } else {
            alert("Utilisez le lien de cette page pour la partager.");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Impossible de partager le lien.");
        }
    }
}

// 3. Afficher le QR Code
function showQR() {

    const container = document.getElementById("qr-container");
    const qr = document.getElementById("qrcode");

    qr.innerHTML = "";

    if (window.location.protocol === "file:") {
        alert("Publiez votre carte sur Internet pour créer son QR Code.");
        return;
    }

    container.style.display = "block";

    new QRCode(qr, {
        text: window.location.href,
        width: 180,
        height: 180
    });

    container.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Fermer QR Code
function closeQR() {
    document.getElementById("qr-container").style.display = "none";
}
