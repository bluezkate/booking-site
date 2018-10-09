'use strict'

// Перемещение метки по карте + установление значения адреса
const   pinMain = document.querySelector('.map__pin--main'),
        map = document.querySelector('.map'),
        noticeForm = document.querySelector('.notice__form'),
        address = document.getElementById('address');

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

        pinMain.style.left = pinMain.offsetLeft - shift.x + 'px';
        if ((pinMain.offsetTop - shift.y) > 130 && (pinMain.offsetTop - shift.y) < 630) {
            pinMain.style.top = pinMain.offsetTop - shift.y + 'px';
        }

        // Активируем карту и форму отправки
        // Сделать условие, при котором код выполняется только при первом передвижении кнопки
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');

        // Подставляем в поле "Адрес" текущие координаты метки
        address.value = `${pinMain.offsetLeft - shift.x + 32}, ${pinMain.offsetTop - shift.y + 75}`;
    }

    const pinUp = function (upEvt) {
        map.removeEventListener('mousemove', pinMove);
        map.removeEventListener('mouseup', pinUp);
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
            return fileName.endsWith(it);
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

    picChooser.addEventListener('change', function(){

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

// МАНИПУЛЯЦИИ С INPUT и SELECT
// Установление связи между типом жилья и ценой
const   type = document.getElementById('type'),
        price = document.getElementById('price');

type.addEventListener('change', function () {
    switch (this.value) {
        case 'flat':
            price.setAttribute('min', 1000);
            break
        case 'bungalo':
            price.setAttribute('min', 0);
            break
        case 'house':
            price.setAttribute('min', 5000);
            break
        case 'palace':
            price.setAttribute('min', 10000);
            break
    }
    // в ТЗ не было понятно, нужно ли менять плейсхолдер или нет, но если что
    // price.setAttribute('placeholder', '0/1000/5000/10000');
});    

// Установление связи между кол-вом комнат и кол-вом мест
const   roomNumber = document.getElementById('room_number'),
        capacity = document.getElementById('capacity');

roomNumber.addEventListener('change', function(){
    capacity.options[0].setAttribute('disabled', 'disabled');
    for (let i = 1; i < capacity.options.length; i++) {
        capacity.options[i].removeAttribute('disabled', 'disabled');
        if (this.value < capacity.options[i].value) {
            capacity.options[i].setAttribute('disabled', 'disabled');
        } else if ((this.value > capacity.options[i].value) && (this.value > 3)) {
            capacity.options[i].setAttribute('disabled', 'disabled');
            capacity.options[0].removeAttribute('disabled', 'disabled');
        }      
    }
});

// Установление связи между временем заезда и временем выезда
const   timeIn = document.getElementById('timein'),
        timeOut = document.getElementById('timeout');

timeIn.addEventListener('change', function() {
    timeOut.selectedIndex = this.selectedIndex;
});
timeOut.addEventListener('change', function(){
    timeIn.selectedIndex = this.selectedIndex;
});


// Валидация формы
const   formElement = document.querySelectorAll('.notice__form input[type=text], input[type=number]'),
        formSubmit = document.querySelector('.form__submit');

formSubmit.addEventListener('click', function() { 
    for (let i = 0; i < formElement.length; i++) {
        formElement[i].addEventListener('invalid', function(){
            formElement[i].style.outlineColor = "red";
            formElement[i].style.outlineStyle = "solid";
            formElement[i].style.outlineWidth = "3px";
            
            setTimeout (function(){
                formElement[i].style.outlineColor = "none";
                formElement[i].style.outlineStyle = "none";
                formElement[i].style.outlineWidth = "none";
            }, 5000);
        });
    }
});