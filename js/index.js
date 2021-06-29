// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');

  const subTotal = price.innerHTML * quantity.value;
  const subTotalField = product.querySelector('.subtotal span');

  return (subTotalField.innerHTML = subTotal);

  //... your code goes here
}

function calculateAll() {
  // ITERATION 2
  const products = document.getElementsByClassName('product');
  let total = 0;
  for (const product of products) {
    total += Number(updateSubtotal(product));
  }
  // ITERATION 3
  return (document.querySelector('#total-value span').innerHTML = total);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  let tr = target.parentNode.parentNode;
  let tbody = tr.parentNode;

  tbody.removeChild(tr);
  calculateAll();
}

// ITERATION 5

function createProduct(event) {
  // Crear nuevo producto
  const tr = event.currentTarget.parentNode.parentNode;
  const name = tr.querySelector('.create-product input').value;
  const price = tr.querySelector('input[type=number]').value;
  const newElement = document.createElement('tr');
  newElement.className = 'product';

  //El inner HTML del nuevo producto (tr)
  let newInnerHTML = `<td class="name">
    <span>${name}</span>
  </td>
  <td class="price">$<span>${Number(price).toFixed(2)}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>`;

  // se llena el nuevo tr
  newElement.innerHTML = newInnerHTML;

  // se le agrega la funcionalidad de borrar al nuevo boton
  newElement
    .getElementsByClassName('btn-remove')[0]
    .addEventListener('click', removeProduct);

  // se agrega al HTML
  const body = document.getElementsByTagName('tbody');
  body[0].appendChild(newElement);

  // se borran los inputs del Create Product
  clearNewProduct();
}

function clearNewProduct() {
  const createProduct = document.getElementsByTagName('tfoot')[0];
  const inputs = createProduct.getElementsByTagName('input');
  inputs[0].value = null;
  inputs[1].value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.getElementsByClassName('btn-remove');
  for (const btn of removeButtons) {
    btn.addEventListener('click', removeProduct);
  }

  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);
});
