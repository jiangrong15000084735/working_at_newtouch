function loadCanvas(head) {
    var cnv = document.getElementById('canvas')
    console.log(cnv)
    var cxt = cnv.getContext('2d')
    var image = new Image()
    image.src = head
    console.log(image.src)
    image.onload = function() {
        cxt = drawImage(image, 10, 10) // 图片的位置
        var imgData = cxt.getImageData(10, 10, 235, 235)
        var data = imgData.data // 红、绿、蓝、透明度

        for (var i = 0; i < data.length; i += 4) {
            data[i + 0] = 255 - data[i + 0]
            data[i + 1] = 255 - data[i + 1]
            data[i + 2] = 255 - data[i + 2]
        }
        this.head = imgData
    }
}

export { loadCanvas }