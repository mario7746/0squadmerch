'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const orderEvents = require('../orders/events');

const cart = require('../cart');

// const onGetProducts = function (event) {
//   event.preventDefault();
//   api.getProducts()
//     .then(ui.getProductsSuccess)
//     .catch(ui.getProductsFailure);
// };

const onShowProduct = function (event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  api.showProduct(id)
    .then(ui.showProductSuccess)
    .catch(ui.showProductFailure);
};

const onPageLoad = function () {
  api.getProducts()
    .then(ui.getProductsSuccess)
    .catch(ui.getProductsFailure);
};

const addToCart = function (event){
  event.preventDefault();
  let i = getFormFields(event.target);
    let currentProduct = cart.find(function(item) {
      if(item._id === i.item._id) {
        return item;
      }
    });
    if (currentProduct !== undefined) {
      let currProdIndex = cart.indexOf(currentProduct);
      if(cart[currProdIndex].quantity + parseInt(i.item.quantity) < 10) {
        cart[currProdIndex].quantity += parseInt(i.item.quantity);
        ui.addToCartSuccess();
      } else {
        cart[currProdIndex].quantity = 10;
        ui.maxItemSuccess();
      }
    } else {
      i.item.quantity = parseInt(i.item.quantity);
      cart.push(i.item);
      ui.addToCartSuccess();
    }
};

const removeFromCart = function (event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  let delObj = cart.find((item) => {
      if(item._id === id) {
        return item;
      }
    });
  let delObjInd = cart.indexOf(delObj);
  cart.splice(delObjInd, 1);
  orderEvents.onShowOrder(event);
};

const updateCart = function (event) {
  let id = event.target.dataset.id;
  console.log(id);
  let i = $('#' + id).val();
  console.log(i);
  let currentProduct = cart.find(function(item) {
    if(item._id === id) {
      return item;
    }
  });
    let currProdIndex = cart.indexOf(currentProduct);
    cart[currProdIndex].quantity = parseInt(i);
    orderEvents.onShowOrder(event);
};


const addHandlers = () => {
  $('.cart-modal').on('click', ".item-edit", updateCart);
  $('.products-container').on('click', ".show-product", onShowProduct);
  $('.product-modal').on('submit', "#show-form", addToCart);
  $('.cart-modal').on('click', ".item-delete", removeFromCart);
};

module.exports = {
  addHandlers,
  onPageLoad,
};
