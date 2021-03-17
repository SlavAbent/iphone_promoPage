document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const getData = (url, callback) => {
        // const request = new XMLHttpRequest();
        // request.open('GET', url);
        // request.send();
        // request.addEventListener('readystatechange', () => {
        //     if(request.readyState !== 4) return;
        //     if(request.status === 200) {
        //         const response = JSON.parse(request.response);
        //         callback(response);
        //     } else {
        //         console.error(new Error('Ошибка:' + request.status));
                
        //     }
        // });
        fetch(url)
            .then((responce) => {
                if(responce.ok){
                    return responce.json()
                }

                throw new Error(responce.statusText)
            })
            .then(callback)
            .catch((err) => {
                console.log(err)
            })
    }

    

    const tabs = () => {
        const cardDetailChangeElem = document.querySelectorAll('.card-detail__change')
        const cardDetailsTitleElem = document.querySelector('.card-details__title')
        const cardImageItemElem = document.querySelector('.card__image_item')
        const cardDetailsPriceElem = document.querySelector('.card-details__price')
        const descriptionMemory = document.querySelector('.description__memory')

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoryROM: 128

            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120990,
                memoryROM: 256
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 99990,
                memoryROM: 128
            },
        ]

        const deactive = () => {
            cardDetailChangeElem.forEach(btn => btn.classList.remove('active'))
        }

        cardDetailChangeElem.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if(!btn.classList.contains('active')){
                    deactive()
                    btn.classList.add('active')
                    cardDetailsTitleElem.textContent = data[i].name
                    cardImageItemElem.src = data[i].img
                    cardImageItemElem.alt = data[i].name
                    cardDetailsPriceElem.textContent = data[i].price + '₽'
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`
                }
            })
        })




        // const cardImageElems = document.querySelectorAll('.card__image')

        // const hideAll = () => {
        //     for(let i = 0; i < cardImageElems.length; i++) {
        //         cardDetailChangeElems[i].classList.remove('active')
        //         cardDetailsTitleElems[i].classList.remove('active')
        //         cardImageElems[i].classList.remove('active')
        //     }
        // }

        // for(let i = 0; i < cardDetailChangeElems.length; i++) {
        //     cardDetailChangeElems[i].addEventListener('click', () => {
        //         hideAll()
        //         cardDetailChangeElems[i].classList.add('active')
        //         cardDetailsTitleElems[i].classList.add('active')
        //         cardImageElems[i].classList.add('active')
        //     })  
        // }
    }

    const accordion = () => {
        // const characteristicsTitle = document.querySelectorAll('.characteristics__title')
        // const characteristicsDescription = document.querySelectorAll('.characteristics__description')

        // characteristicsTitle.forEach((elem, i) => {
        //     elem.addEventListener('click', () => {
        //         elem.classList.toggle('active')
        //         characteristicsDescription[i].classList.toggle('active')
        //     })
        // })

        const characteristicsListElem = document.querySelector('.characteristics__list')
        const characteristicsItemElems= document.querySelectorAll('.characteristics__item')

        const open = (button, dropdown) => {
            closeAllDrops()
            dropdown.style.height = `${dropdown.scrollHeight}px`
            button.classList.add('active')
            dropdown.classList.add('active')
        }

        const close = (button, dropdown) => {
            button.classList.remove('active')
            dropdown.classList.remove('active')
            dropdown.style.height = '';
        }

        const closeAllDrops = (button, dropdown) => {
            characteristicsItemElems.forEach((elem) => {
                if(elem.children[0] !== button && elem.children[1] !== dropdown) {
                    close(elem.children[0], elem.children[1])
                }
            })
        }

        characteristicsListElem.addEventListener('click', (e) => {
            const target = e.target
            if(target.classList.contains('characteristics__title')){
                const parent = target.closest('.characteristics__item')
                const description = parent.querySelector('.characteristics__description')
                description.classList.contains('active') ? close(target, description) : open(target, description)
            }
        })

        document.body.addEventListener('click', (e) => {
            const target = e.target
            if(!target.closest('.characteristics__list')){
                closeAllDrops()
            }
        })
    }

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy')
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery')
        const modal = document.querySelector('.modal')
        const cardDetailsTitle = document.querySelector('.card-details__title')
        const modalTitle = modal.querySelector('.modal__title')
        const modalSubtitle = modal.querySelector('.modal__subtitle')
        const modalTitleSubmit = modal.querySelector('.modal__title-submit')

        const openModal = e => {
            const target = e.target
            modal.classList.add('open')
            document.addEventListener('keydown', escapeHandler)
            modalTitle.textContent = cardDetailsTitle.textContent
            modalTitleSubmit.value = cardDetailsTitle.textContent
            modalSubtitle.textContent = target.dataset.buttonBuy
        }
        const closeModal = () => {
            modal.classList.remove('open')
            document.removeEventListener('keydown', escapeHandler)
        }

        const escapeHandler = e => {
            if(e.code === 'Escape') {
                closeModal()
            }
        }

        modal.addEventListener('click', (e) => {
            const target = e.target
            if(target.classList.contains('modal__close') || target === modal){
                closeModal()
            }
        })

        cardDetailsButtonBuy.addEventListener('click', openModal)
        cardDetailsButtonDelivery.addEventListener('click', closeModal)

        
    }

    const renderCrossSell = () => {
        const crossSellList  = document.querySelector('.cross-sell__list')
        const createCrossSellItem = (good) => {
            const {photo, name, price} = good
            const liItem = document.createElement('li')
            liItem.innerHTML = `
                
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${photo}" alt="">
                    <h3 class="cross-sell__title">${name}</h3>
                    <p class="cross-sell__price">${price}₽</p>
                    <div class="button button_buy cross-sell__button">Купить</div>
                </article>
            `

            return liItem
        }
        const createCrossSellList = (goods) => {
            goods.forEach(item => {
                crossSellList.append(createCrossSellItem(item))
            })
        }


        getData('cross-sell-dbase/dbase.json', createCrossSellList)
    }

    tabs()
    accordion()
    modal()
    renderCrossSell()
})