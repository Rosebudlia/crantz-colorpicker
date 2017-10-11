window.onload = () => {

    let myCP = new ColorPicker('#input-r', '#input-g', '#input-b', '#input-a', '#input-hex', '.swatch', '.test-box');
    myCP.canvas = document.querySelector('#colorpicker_1');
    myCP.ctx = myCP.canvas.getContext('2d');
    myCP.palette = new Image();
    myCP.palette.src = "img/colorpicker-greys.png";


    myCP.palette.onload = () => {
        myCP.ctx.drawImage(myCP.palette, 0, 0, myCP.palette.width, myCP.palette.height, 0, 0, myCP.canvas.width, myCP.canvas.height);
    };

    myCP.canvas.onclick = (event) => {
        let mouseX = event.clientX - 20;
        let mouseY = event.clientY - 40;
        console.log('clicked ', mouseX, mouseY);
        myCP.ctx.drawImage(myCP.palette, 0, 0, myCP.palette.width, myCP.palette.height, 0, 0, myCP.canvas.width, myCP.canvas.height);
        myCP.ctx.beginPath();
        myCP.ctx.arc(mouseX-2, mouseY-2, 5, 0, 2 * Math.PI, false);
        myCP.ctx.lineWidth = 2;
        myCP.ctx.strokeStyle = '#333333';
        myCP.ctx.stroke();

        let imgData = myCP.ctx.getImageData(mouseX, mouseY, 1, 1).data;
        myCP.setColor(imgData);
    };


}

function ColorPicker (r, g, b, a, hex, swatch, text) {
    this.rInput = document.querySelector(r);
    this.gInput = document.querySelector(g);
    this.bInput = document.querySelector(b);
    this.aInput = document.querySelector(a);
    this.hexInput = document.querySelector(hex);
    this.swatch = document.querySelector(swatch);
    this.text = document.querySelector(text);


    this.setColor = (imageData)=> {
        console.log(imageData[0], imageData[1], imageData[2]);
        this.rInput.value = imageData[0];
        this.gInput.value = imageData[1];
        this.bInput.value = imageData[2];
        this.aInput.value = 1;

        let rgba = 'rgba(' + imageData[0] + ', ' + imageData[1] + ', ' + imageData[2] + ', 1)';
        this.swatch.style.backgroundColor = rgba;
        this.text.style.color = rgba;


        let hex =
            ("0" + parseInt(imageData[0],10).toString(16)).slice(-2) +
            ("0" + parseInt(imageData[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(imageData[2],10).toString(16)).slice(-2);

        this.hexInput.value = hex;

    };
}


