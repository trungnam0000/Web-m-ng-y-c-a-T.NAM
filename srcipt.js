// Danh sách các sự kiện
const events = [
    { name: "Noel", date: "2024-12-25T00:00:00", effect: "effect-christmas" },
    { name: "Tết 2025", date: "2025-01-01T00:00:00", effect: "effect-new-year" },
    { name: "Trung Thu", date: "2025-09-15T00:00:00", effect: "effect-mid-autumn" },
    { name: "Halloween", date: "2025-10-31T00:00:00", effect: "effect-halloween" },
    // Thêm các sự kiện khác nếu cần
];

// Xác định sự kiện sắp tới nhất
const now = new Date();
let nextEvent = events.find(event => new Date(event.date) > now);
let eventDate = new Date(nextEvent.date);

// Thay đổi hiệu ứng nền trang
document.body.classList.add(nextEvent.effect);
document.getElementById("event-info").innerText = `Sự kiện sắp tới: ${nextEvent.name} - ${eventDate.toLocaleDateString()}`;

// Đếm ngược
function updateCountdown() {
    const now = new Date();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById("countdown-clock").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Thông báo chúc mừng sự kiện khi đếm ngược về 0
    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("congrats-message").innerHTML = `Chúc mừng ${nextEvent.name} đã đến!`;
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);

// Lấy thông tin địa chỉ IP và vị trí
fetch('https://ipinfo.io/json?token=8ff97da33f17fe')
    .then(response => response.json())
    .then(data => {
        document.getElementById("userIP").innerHTML = `IP của bạn là: ${data.ip}`;
        document.getElementById("userLocation").innerHTML = `Vị trí: ${data.city}, ${data.region}, ${data.country}`;
    })
    .catch(err => console.log('Không thể lấy thông tin IP'));

// Lấy thông tin ngày tháng hiện tại
function getCurrentDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById("currentDate").innerHTML = `Hôm nay là: ${now.toLocaleString("vi-VN", { weekday: "long" })}, ngày ${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}
setInterval(getCurrentDate, 1000);

// Đóng thanh thông báo
function closeNotification() {
    document.getElementById("notification").style.display = "none";
}