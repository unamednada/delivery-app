import { waitFor } from '@testing-library/react';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import {
  Button,
  Loading,
  SelectInput,
  TextInput,
  HeaderLink,
  TotalPrice,
  TextCard,
  StatusCard,
  OrderCard,
  AddressCard,
} from '../components';
import { renderWithContext, renderWithRouter } from './mocks/mockRender';
import mockProductDB from './mocks/mockProductDB';
import api from '../services/APIRequests';

describe('Components', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe('<Button />', () => {
    let button;

    const onClick = jest.fn();

    beforeEach(async () => {
      act(() => {
        render(
          <Button
            type="button"
            className="test"
            handleClick={ onClick }
            name="test"
            dataTestId="test"
          />,
          container,
        );
      });

      button = container.querySelector('button');
    });

    afterEach(() => {
      button = null;
    });

    it('should render a button', () => {
      expect(button).toBeTruthy();
    });

    it('should render the button props correctly', () => {
      expect(button.getAttribute('type')).toBe('button');
      expect(button.getAttribute('class')).toBe('test');
      expect(button.getAttribute('name')).toBe('test');
      expect(button.getAttribute('data-testid')).toBe('test');
    });

    it('should render the button text correctly', () => {
      expect(button.textContent).toBe('test');
    });

    it('should render the button disabled correctly', () => {
      expect(button.disabled).toBe(false);
      button.disabled = true;
      expect(button).toBeDisabled();
      act(() => {
        button.click();
      });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should respond to click correctly', () => {
      act(() => {
        button.click();
      });
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('<Loading />', () => {
    let loading;
    beforeEach(() => {
      act(() => {
        render(
          <Loading />,
          container,
        );
      });

      loading = container.querySelector('h3');
    });

    afterEach(() => {
      loading = null;
    });

    it('should render a loading message', () => {
      expect(loading).toBeTruthy();
      expect(loading.textContent).toBe('Carregando...');
    });

    it('should have a loading class', () => {
      expect(loading).toHaveClass('loading');
    });
  });

  describe('<SelectInput />', () => {
    let selectInput;

    const onChange = jest.fn();

    beforeEach(() => {
      act(() => {
        render(
          <SelectInput
            className="test"
            name="test"
            labelText="testsel"
            value="test"
            options={ [
              'test',
              'test2',
            ] }
            onChange={ onChange }
            dataTestId="test"
          />,
          container,
        );
      });

      selectInput = container.querySelector('select');
    });

    afterEach(() => {
      selectInput = null;
    });

    it('should render a select input', () => {
      expect(selectInput).toBeTruthy();
    });

    it('should render the select input props correctly', () => {
      expect(selectInput.getAttribute('class')).toBe('test');
      expect(selectInput.getAttribute('name')).toBe('test');
      expect(selectInput.value).toBe('test');
      expect(selectInput.getAttribute('id')).toBe('test');
      expect(selectInput.getAttribute('data-testid')).toBe('test');
    });

    it('should render the select input label correctly', () => {
      const label = container.querySelector('label');
      expect(label.textContent).toBe('testsel ');
      expect(label.getAttribute('for')).toBe('test');
    });

    it('should render the select input options correctly', () => {
      expect(selectInput.children.length).toBe(2);
      expect(selectInput.children[0].textContent).toBe('test');
      expect(selectInput.children[1].textContent).toBe('test2');
    });

    it('should respond to change correctly', () => {
      act(() => {
        Simulate.change(selectInput, { target: { value: 'test2' } });
        Simulate.change(selectInput, { target: { value: 'test' } });
      });
      
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('<TextInput />', () => {
    let textInput;

    const onChange = jest.fn();

    beforeEach(() => {
      act(() => {
        render(
          <TextInput
            className="test"
            name="test"
            labelText="test"
            value="test"
            onChange={ onChange }
            type="text"
          />,
          container,
        );
      });

      textInput = container.querySelector('input');
    });

    afterEach(() => {
      textInput = null;
    });

    it('should render a text input', () => {
      expect(textInput).toBeTruthy();
    });

    it('should render the text input props correctly', () => {
      expect(textInput.getAttribute('class')).toBe('test');
      expect(textInput.getAttribute('name')).toBe('test');
      expect(textInput.value).toBe('test');
      expect(textInput.getAttribute('id')).toBe('test');
      expect(textInput.getAttribute('type')).toBe('text');
      expect(textInput.getAttribute('placeholder')).toBe('');
    });

    it('should render the text input label correctly', () => {
      const label = container.querySelector('label');
      expect(label.textContent).toBe('test ');
      expect(label.getAttribute('for')).toBe('test');
    });

    it('should respond to change correctly', () => {
      act(() => {
        Simulate.change(textInput, { target: { value: 'test2' } });
        Simulate.change(textInput, { target: { value: 'test' } });
      });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('<HeaderLink />', () => {
    let headerLink;

    beforeEach(() => {
      act(() => {
        renderWithRouter(
          <HeaderLink
            name="test"
            path="test"
            user="test"
            dataTestId="test"
          />,
          container,
        );
      });

      headerLink = container.querySelector('a');
    });

    afterEach(() => {
      headerLink = null;
    });

    it('should render a link', () => {
      expect(headerLink).toBeTruthy();
    });

    it('should render the link props correctly', () => {
      expect(headerLink.getAttribute('href')).toBe('/test/test');
      expect(headerLink.getAttribute('data-testid')).toBe('test');
      expect(headerLink.textContent).toBe('test');
    });
  });

  describe('<TotalPrice />', () => {
    let totalPrice;

    api.get = () => Promise.resolve({
      data: { mockProductDB },
    });

    beforeEach(async () => {
      await act(async () => {
        renderWithContext(
          <TotalPrice 
            dataTestId='test'
          />,
          container,
        );
      });

      totalPrice = container.querySelector('span');
    });

    afterEach(() => {
      totalPrice = null;
    });

    it('should render a span', () => {
      expect(totalPrice).toBeTruthy();
    });

    it('should render the span props correctly', async () => {
      await waitFor(async () => {
        expect(totalPrice.getAttribute('data-testid')).toBe('test');
        expect(totalPrice.textContent).toBe(' R$ 0,00');
      });
    });
    // need test handletotalprice
  });

  describe('<TextCard />', () => {
    let textCard;

    beforeEach(() => {
      act(() => {
        render(
          <TextCard
            className="test"
            text="test"
            dataTestId='test'
          />,
          container,
        );
      });

      textCard = container.querySelector('div');
    });

    afterEach(() => {
      textCard = null;
    });

    it('should render a div', () => {
      expect(textCard).toBeTruthy();
    });

    it('should render a paragraph element inside of the div', () => {
      expect(textCard.children[0].tagName).toBe('P');
      const paragraph = textCard.children[0];
      expect(paragraph.textContent).toBe('test');
      expect(paragraph.getAttribute('data-testid')).toBe('test');
      expect(paragraph.className).toBe('test');
    });
  });

  describe('<StatusCard />', () => {
    let statusCard;

    beforeEach(() => {
      act(() => {
        render(
          <StatusCard
            status="test"
            dataTestId='test'
          />,
          container,
        );
      });

      statusCard = container.querySelector('div');
    });

    afterEach(() => {
      statusCard = null;
    });

    it('should render a div', () => {
      expect(statusCard).toBeTruthy();
    });

    it('should render a paragraph element inside of the div', () => {
      expect(statusCard.children[0].tagName).toBe('P');
      const paragraph = statusCard.children[0];
      expect(paragraph.textContent).toBe('test');
      expect(paragraph.getAttribute('data-testid')).toBe('test');
      expect(paragraph.className).toBe('status');
    });
  });

  describe('<OrderCard />', () => {
    let orderCard;

    beforeEach(() => {
      act(() => {
        render(
          <OrderCard
            id={ 1}
            dataTestId='test'
          />,
          container,
        );
      });

      orderCard = container.querySelector('div');
    });

    afterEach(() => {
      orderCard = null;
    });

    it('should render a div', () => {
      expect(orderCard).toBeTruthy();
    });

    it('should render two paragraph elements inside of the div', () => {
      expect(orderCard.children.length).toBe(2);
      const paragraphText = orderCard.children[0];
      const paragraphNumber = orderCard.children[1];
      expect(paragraphText.tagName).toBe('P');
      expect(paragraphNumber.tagName).toBe('P');
    });

    it('should render the paragraph elements with the correct text', () => {
      const paragraphText = orderCard.children[0];
      const paragraphNumber = orderCard.children[1];
      expect(paragraphText.textContent).toBe('Pedido');
      expect(paragraphNumber.textContent).toBe('1');
    });
  });

  describe('<AddressCard />', () => {
    let addressCard;

    beforeEach(() => {
      act(() => {
        render(
          <AddressCard
            address="test"
            hidden={ false }
            id={ 1 }
          />,
          container,
        );
      });

      addressCard = container.querySelector('div');
    });

    afterEach(() => {
      addressCard = null;
    });

    it('should render a div', () => {
      expect(addressCard).toBeTruthy();
    });

    it('should render a paragraph element inside of the div', () => {
      expect(addressCard.children[0].tagName).toBe('P');
      const paragraph = addressCard.children[0];
      expect(paragraph.textContent).toBe('test');
      expect(paragraph.getAttribute('data-testid')).toBe('seller_orders__element-card-price-1');
      expect(paragraph.className).toBe('address');
    });

    it('should hide the div when the hidden prop is true', () => {
      act(() => {
        render(
          <AddressCard
            address="test"
            hidden
            id={ 1 }
          />,
          container,
        );
      });

      addressCard = container.querySelector('div');
      expect(addressCard).not.toBeVisible();
    });
  });
});
