// const sum = (...nums) => {
//     console.log(nums);
// };

// sum(1,2,3,4,5);

const obj = {
    name: 'Elvin',
    nickname: 'Kele'
}

localStorage.setItem('elvin', JSON.stringify(obj));

////#region Counter

// const decreaserBtn = document.querySelector('.decreaser');
// const increaserBtn = document.querySelector('.increaser');
// const countText = document.querySelector('.count-text');

// countText.innerHTML = localStorage.getItem('count') ?? 1;

// const setCount = c => {
//     countText.innerText = c;
//     localStorage.setItem('count', c);
// };

// const handleChange = type => {
//     const currentCount = localStorage.getItem('count') ?? (countText.innerText || 1);

//     switch (type) {
//         case 'minus':
//             if (+currentCount > 1) {
//                 setCount(+currentCount - 1);
//             }
//             break;
//         case 'plus':
//             setCount(+currentCount + 1);
//             break;
//         default:
//             break;
//     }
// };

// decreaserBtn.addEventListener('click', () => handleChange('minus'));
// increaserBtn.addEventListener('click', () => handleChange('plus'));

////#endregion

//#region Timestamp checking

// const data = {
//     name: 'Anar',
//     surname: 'Balacayev',
//     age: 20
// }

// localStorage.setItem('anar', JSON.stringify(data));
// localStorage.setItem('dataWasWrittenAt', +new Date());

// const tsFromLS = +localStorage.getItem('dataWasWrittenAt');
// const currentTimeStamp = +new Date();

// const diff = currentTimeStamp - tsFromLS;
// const diffWithHours = Math.floor(diff/1000/60/60);

// if (diffWithHours >= 2) {
//     alert('Anar, please, fill your information again');
//     localStorage.removeItem('anar');
// }

//#endregion

const itemCount = document.querySelector('.basket__count');
const basketAdders = document.querySelectorAll('.btn-add-to-basket');
const basketItems = document.querySelector('#basket-items');

const setCountOfItems = c => {
    if (c) {
        itemCount.classList.add('shown');
        itemCount.innerText = c;
    } else {
        itemCount.classList.remove('shown')
    }
}

const getItemsAsArray = () => JSON.parse(localStorage.getItem('items') ?? '[]');

const removeItem = image => {
    const itemsAsArray = getItemsAsArray();

    const newItemsToSet = itemsAsArray.filter(i => i !== image);

    localStorage.setItem('items', JSON.stringify(newItemsToSet));

    setCountOfItems(newItemsToSet.length);
    previewItems();
};

const previewItems = () => {
    // empty the list
    basketItems.innerHTML = '';

    const itemsAsArray = getItemsAsArray();

    itemsAsArray.forEach(i => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-div');

        const img = document.createElement('img');
        img.src = i;
        imgDiv.append(img);

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-div');

        // create icon
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash');

        icon.addEventListener('click', (e) => {
            const imgSrc = e.target.parentNode.parentNode.querySelector('img').src;
            removeItem(imgSrc);
        });

        iconDiv.append(icon);
        imgDiv.append(iconDiv);

        basketItems.append(imgDiv);
    });
};

const itemsInBasket = localStorage.getItem('items');

if (itemsInBasket) {
    const itemsAsArray = JSON.parse(itemsInBasket);
    setCountOfItems(itemsAsArray.length);
    previewItems();
}

const addToBasket = image => {
    // take items from LS as string
    const itemsInLS = localStorage.getItem('items') ?? '[]';

    // convert to array
    const itemsAsArray = getItemsAsArray();

    // if image has not been added yet
    if (!itemsAsArray.includes(image)) {
        const itemsToSet = [...itemsAsArray, image];
        localStorage.setItem('items', JSON.stringify(itemsToSet));
        setCountOfItems(itemsToSet.length);
    }
};

basketAdders.forEach(b => {
    b.addEventListener('click', function () {
        const imageSrc = this.parentNode.parentNode.querySelector('img').src;
        addToBasket(imageSrc);
        previewItems();
    });
});

const arr = [{ id: 1 }, { id: 3 }];
