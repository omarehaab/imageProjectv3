(() => {
  const e = document.getElementById("imageUpload"),
    t = document.getElementById("gallery"),
    n = document.getElementById("selectedImage"),
    a = document.getElementById("widthInput"),
    d = document.getElementById("heightInput"),
    s = document.getElementById("resizeBtn");
  let c = null;
  function i(e) {
    const a = document.createElement("img");
    (a.src = e),
      a.addEventListener("click", () => {
        (n.src = e), (c = new Image()), (c.src = e);
      }),
      t.appendChild(a);
  }
  e.addEventListener("change", (e) => {
    const t = e.target.files[0];
    if (t && t.type.startsWith("image/")) {
      const e = new FileReader();
      (e.onload = () => {
        i(e.result);
      }),
        e.readAsDataURL(t);
    }
  }),
    s.addEventListener("click", () => {
      if (!c) return void alert("Please select an image to resize.");
      const e = parseInt(a.value),
        t = parseInt(d.value);
      if (isNaN(e) || isNaN(t) || e <= 0 || t <= 0)
        return void alert("Please enter valid dimensions.");
      const s = document.createElement("canvas");
      (s.width = e),
        (s.height = t),
        s.getContext("2d").drawImage(c, 0, 0, e, t);
      const l = s.toDataURL();
      (n.src = l), i(l);
    });
})();
