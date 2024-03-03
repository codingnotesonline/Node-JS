let form = document.getElementById("form-main");

form.addEventListener("submit", () => {
    sessionStorage.clear();
    sessionStorage.setItem("authenticated", true);
});