import React from "react";
import { act } from "react-dom/test-utils";
import { renderWithContext } from "../mocks/mockRender";
import { ProductCard } from "../../templates";
import { unmountComponentAtNode } from "react-dom";

describe('<ProductCard />', () => {
  let container = null;
  let productCard;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.setItem('cart', JSON.stringify([]));
  });

  afterAll(() => {
    localStorage.removeItem('cart');
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  beforeEach(() => {
    act(() => {
      renderWithContext(
        <ProductCard
          id={ 1 }
          imageURL={ "https://picsum.photos/200/300" }
          name={ "Product 1" }
          price={ 10.00 }
        />,
        container,
      );
    });

    productCard = container.querySelector('.product-card');
  });

  afterEach(() => {
    productCard = null;
  });

  it('should render a product card', () => {
    expect(productCard).toBeTruthy();
  });

  it('should render a div with the price and image', () => {
    const productCardContent = productCard.children[0];
    expect(productCardContent).toBeTruthy();
    const totalPrice = productCardContent.children[0];
    expect(totalPrice).toBeTruthy();
    expect(totalPrice.textContent).toBe('R$ 10,00');
    expect(totalPrice.getAttribute('data-testid')).toBe('customer_products__element-card-price-1');
    const productImage = productCardContent.children[1];
    expect(productImage).toBeTruthy();
    expect(productImage.getAttribute('src')).toBe('https://picsum.photos/200/300');
    expect(productImage.getAttribute('data-testid')).toBe('customer_products__img-card-bg-image-1');
  });

  it('should render a div with the name and correct buttons', () => {
    const productCardNameDiv = productCard.children[1];
    expect(productCardNameDiv).toBeTruthy();
    const productCardName = productCardNameDiv.children[0];
    expect(productCardName).toBeTruthy();
    expect(productCardName.textContent).toBe('Product 1');
    expect(productCardName.getAttribute('data-testid')).toBe('customer_products__element-card-title-1');
    expect(productCardNameDiv.children.length).toBe(5);
    expect(productCardNameDiv.children[1].getAttribute('data-testid')).toBe('customer_products__button-card-rm-item-1');
    expect(productCardNameDiv.children[2].getAttribute('for')).toBe('quantity');
    expect(productCardNameDiv.children[3].getAttribute('data-testid')).toBe('customer_products__input-card-quantity-1');
    expect(productCardNameDiv.children[4].getAttribute('data-testid')).toBe('customer_products__button-card-add-item-1');
  });

  it('should call the context to handle the quantity', () => {
    expect(true).toBe(false);
  });
});