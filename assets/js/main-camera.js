var shutter = new Audio();

function konfigurasi() {
	Webcam.reset();

	shutter.autoplay = false;
	shutter.src = BASE_URL + '/assets/files/sound/shutter.mp3';

	Webcam.set({
		width: 640,
		height: 480,

		image_format: 'jpeg',
		jpeg_quality: 100,
	});

	Webcam.attach('#kamera');
}

function ambil() {
	shutter.play();
	Webcam.snap( function(data_uri) {
		$("#modal-camera").modal('hide');
		$("#modal-crop").modal('show');
		$("#modal-crop").modal({backdrop: "static", keyboard: false});
		$("#cropimage").html('<img id="imageprev" src="' + BASE_URL + 'assets/images/background/bg.png"/>');
		$("#cropimage").html('<img id="imageprev" src="' + data_uri + '"/>');
		cropImage();
		Webcam.reset();
	});
}

function kamera() {
	$("#modal-camera").modal('show');
	$("#modal-camera").modal({backdrop: "static", keyboard: false});
	$("#modal-crop").modal('hide');
	$('#file_path').val('');
	konfigurasi();
}

function cropImage() {
	var image = document.querySelector('#imageprev');
	var minAspectRatio = 0.5;
	var maxAspectRatio = 1.5;

	var cropper = new Cropper(image, {
		aspectRatio: 3 / 4,
		minCropBoxWidth: 250,
		minCropBoxHeight: 250,

		ready: function () {
			var cropper = this.cropper;
			var containerData = cropper.getContainerData();
			var cropBoxData = cropper.getCropBoxData();
			var aspectRatio = cropBoxData.width / cropBoxData.height;
				//var aspectRatio = 4 / 3;
				var newCropBoxWidth;
				cropper.setDragMode("move");
				if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
					newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

					cropper.setCropBoxData({
						left: (containerData.width - newCropBoxWidth) / 2,
						width: newCropBoxWidth
					});
				}
			},

			cropmove: function () {
				var cropper = this.cropper;
				var cropBoxData = cropper.getCropBoxData();
				var aspectRatio = cropBoxData.width / cropBoxData.height;

				if (aspectRatio < minAspectRatio) {
					cropper.setCropBoxData({
						width: cropBoxData.height * minAspectRatio
					});
				} else if (aspectRatio > maxAspectRatio) {
					cropper.setCropBoxData({
						width: cropBoxData.height * maxAspectRatio
					});
				}
			},


		});

	$("#scaleY").click(function() {
		var Yscale = cropper.imageData.scaleY;
		if(Yscale == 1){ cropper.scaleY(-1); } else { cropper.scaleY(1); };
	});

	$("#scaleX").click( function() {
		var Xscale = cropper.imageData.scaleX;
		if(Xscale == 1){ cropper.scaleX(-1); } else { cropper.scaleX(1); };
	});

	$("#rotateR").click(function() {
		cropper.rotate(45);
	});

	$("#rotateL").click(function() {
		cropper.rotate(-45);
	});

	$("#reset").click(function() {
		cropper.reset();
		alert('test');
	});

	$("#ratio").change(function() {
		var ratio = $("#ratio").val();
		cropper.setAspectRatio(ratio);
	});

	$("#simpan-gambar").click(function() {
		canvas = cropper.getCroppedCanvas({
			width: 220,
			height: 240,
		});

		var dataURL = canvas.toDataURL();

		$('#foto').attr("src", dataURL);
		$('#file_path').val(dataURL);
		$("#modal-crop").modal('hide');
	});
};

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#foto').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

$("#file").change(function() {
	readURL(this);
});
