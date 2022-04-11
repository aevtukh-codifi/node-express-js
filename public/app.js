const toCurrency = price => {
    return new Intl.NumberFormat('by-BY', {
        currency: 'BYN',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach((node)=> {
    node.textContent = toCurrency(node.textContent)  
})

const $cart = document.querySelector('#cart');

if ($cart) {
    $cart.addEventListener('click', (event)=> {
        if(event.target.classList.contains('js-remove')) {
            const id =event.target.dataset.id

            fetch('/cart/remove/' + id, {
                method: 'DELETE'
            }).then(res => res.json())
              .then(cart => {
                  if (cart.courses.length) {
                    const html = cart.courses.map(e => {
                        return `
                        <tr>
                            <td>${e.title}</td>
                            <td>${e.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${e.id}">Удалить</button>
                            </td>
                        </tr>
                        `
                    }).join('')
                    $cart.querySelector('tbody').innerHTML = html
                    $cart.querySelector('.price').textContent = toCurrency(cart.price)
                  } else {
                      $cart.innerHTML ='<p>Корзина пустая</p>'
                  }
              })
        }
    })
}