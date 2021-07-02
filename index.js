document.getElementById("image").addEventListener("change", () => {
    document.getElementById("download").setAttribute("hidden", "true");
    const c = document.getElementById("inCanvas");
    const ctx = c.getContext("2d");
    const image = document.getElementById("image");
    if(!image.files || !image.files[0]) return;
    const fr = new FileReader();
    fr.addEventListener("load", (e) => {
        const img = new Image();
        img.addEventListener("load", () => {
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById("modify").removeAttribute("hidden");
            document.getElementById("height").value = img.height;
            document.getElementById("width").value = img.width;
        });
        img.src = event.target.result;
    });
    fr.readAsDataURL(image.files[0]);
});

document.getElementById("resize").addEventListener("click", () => {
    let src = cv.imread("inCanvas");
    let dst = new cv.Mat();
    let dsize = new cv.Size(parseInt(document.getElementById("width").value), parseInt(document.getElementById("height").value));
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow("outCanvas", dst);
    document.getElementById("download").removeAttribute("hidden");
});

document.getElementById("download").addEventListener("click", () => {
    console.log(document.getElementById("image").files[0].name);
    const link = document.createElement("a");
    link.download = `${document.getElementById("image").files[0].name.split(".")[0]}-modified.png`;
    link.href = document.getElementById("outCanvas").toDataURL("image/png");
    link.click();
});