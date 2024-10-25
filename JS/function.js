document.addEventListener("DOMContentLoaded", function () {
  // Verifica si estamos en la página de inicio
  if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
    const generateBtn = document.getElementById("generate-btn");
    if (generateBtn) {
      generateBtn.addEventListener("click", function () {
        const url = document.getElementById("url-input").value;
        if (url) {
          window.location.href = `qrcode.html?data=${encodeURIComponent(url)}`;
        } else {
          alert("Please enter a URL.");
        }
      });
    }
  }
  
  // Código para la generación de QR en qrcode.html
  if (window.location.pathname.includes("qrcode.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const data = decodeURIComponent(urlParams.get("data"));

    if (data) {
      const qrCode = new QRCode(document.getElementById("img-qr"), {
        text: data,
        width: 256,
        height: 256,
      });
    } else {
      alert("No data was found to generate the QR code.");
    }

    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        const canvas = document.querySelector("#img-qr canvas");
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "qrcode.png";
        link.click();
      });
    }

    const shareBtn = document.getElementById("share-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", function () {
        navigator.clipboard
          .writeText(data)
          .then(() => {
            alert("URL copiada al portapapeles: " + data);
          })
          .catch((err) => {
            console.log("Error while copying:", err);
          });
      });
    }
  }
});
