'use strict'

const pinMain = document.querySelector('.map__pin--main'),
        map = document.querySelector('.map'),
        noticeForm = document.querySelector('.notice__form');

pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
        x: evt.clientX,
        y: evt.clientY
    }

    const pinMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY,
        }

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        }

        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

        // Активируем карту и форму отправки
        // Сделать условие, при котором код выполняется только при первом передвижении кнопки
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
    }

    const pinUp = function (upEvt) {
        map.removeEventListener('mousemove', pinMove);
        map.removeEventListener('mouseup', pinUp)
    }

    map.addEventListener('mousemove', pinMove);
    map.addEventListener('mouseup', pinUp);
});



// Отображение аватарки
(function (){
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    const picChooserr = document.querySelector('.notice__photo input[type=file]');
    const picPreview = document.querySelector('.notice__photo img');

    picChooserr.addEventListener('change', function(){
        let file = picChooserr.files[0];
        let fileName = file.name.toLowerCase();

        let matches = FILE_TYPES.some(function(it) {
            return fileName.endsWith(it)
        });

        if (matches) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                picPreview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });
})();


// Отображение фотографий жилья
(function (){
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    const picContainer = document.querySelector('.form__photo-container');
    const picChooser = document.querySelector('.form__photo-container input[type=file]');
    // const picPreview = document.querySelector('.form__photo-container img');

    picChooser.addEventListener('change', function(){
        console.log(picChooser.files.length);

        for (let i = 0; i < picChooser.files.length; i++) {
            let fileName = picChooser.files[i].name.toLowerCase();

            let matches = FILE_TYPES.some(function(it) {
                return fileName.endsWith(it)
            });

            const picPreview = document.createElement('img');
            picPreview.setAttribute('width', '200');
            picContainer.appendChild(picPreview);

            if (matches) {
                const reader = new FileReader();

                reader.addEventListener('load', function () {
                    picPreview.src = reader.result;
                });

                reader.readAsDataURL(picChooser.files[i]);
            }
        }
        
    });
})();

// добавить функции в прототипы для сокращения кода