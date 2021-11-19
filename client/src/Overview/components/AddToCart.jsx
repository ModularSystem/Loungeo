/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import styled from 'styled-components';
import utils from '../../Shared/serverUtils.js';
// import Button from '../../Questions_Answers/stylings/Button.js';

const CartSpan = styled.span`
  height: 12vh;
  width: 35vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartForm = styled.form`
  height: 12vh;
  width: 35vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Switch = styled.button`
  font-size: 1.5rem;
  height: 10vh;
  width: 10vh;
  border: none;
  border-radius: 50%;
`;

const SizeSwitch = styled(Switch)`
  color: black;
  background-color: #F8F0FB;
  cursor: pointer;
  &:hover {
    background-color: #EFDCF6;
  }
`;

const SizeSwitchEmpty = styled(Switch)`
  background-color: #F8F0FB;
  text-decoration: line-through;
`;

const SizeSwitchClicked = styled(Switch)`
  background-color: #262730;
  color: white;
`;

const CartButton = styled.input`
  font-size: 2rem;
  border: none;
  color: white;
  background: #262730;
  width: 25vw;
  height: 7vh;

  &:hover {
    background: #7D8491;
  }`;

const Select = styled.select`
font-size: 1.7rem;
width: 5vw;
height: 7vh;
text-align: center;
`;

export default function AddToCart({ currentStyle, setCart, cart }) {
  if (Object.keys(currentStyle).length === 0) {
    return (
      <div>Loading Sizes</div>
    );
  }
  const [currentQuantity, setCurrentQuantity] = useState(null);
  const [currentID, setCurrentID] = useState(null);
  const [currentSize, setCurrentSize] = useState('');
  const [addCartValue, setAddCartValue] = useState(1);

  const sizesNums = currentStyle.skus;
  // const skusKeys = Object.keys(currentStyle.skus);
  // skusKeys.forEach((key) => {
  //   currentStyle.skus[key].id = key;
  //   sizesNums.push(currentStyle.skus[key]);
  // });
  // const end = sizesNums.length - 1;
  // sizesNums[end].size = sizesNums[end].size === 'XL' ? 'XXL' : sizesNums[end].size;

  if (!currentSize) {
    setCurrentSize(sizesNums[0].size);
    setCurrentQuantity(sizesNums[0].quantity);
    setCurrentID(Number(sizesNums[0].id));
  }

  return (
    <>
      <div>
        <CartSpan>
          {sizesNums.map((sizeNum, index) => {
            if (sizeNum.quantity === 0) {
              return (
                <SizeSwitchEmpty
                  key={index.toString()}
                >{sizeNum.size}
                </SizeSwitchEmpty>
              );
            } if (currentSize === sizeNum.size) {
              return (
                <SizeSwitchClicked
                  key={index.toString()}
                >{sizeNum.size}
                </SizeSwitchClicked>
              );
            }
            return (
              <SizeSwitch
                key={index.toString()}
                onClick={() => {
                  setCurrentSize(sizeNum.size);
                  setCurrentQuantity(sizeNum.quantity);
                  setCurrentID(Number(sizeNum.id));
                }}
                onKeyPress={() => {
                  setCurrentSize(sizeNum.size);
                  setCurrentQuantity(sizeNum.quantity);
                  setCurrentID(Number(sizeNum.id));
                }}
              >{sizeNum.size}
              </SizeSwitch>
            );
          })}
        </CartSpan>
      </div>
      <div>
        <CartForm onSubmit={(e) => {
          e.preventDefault();
          utils.postToCart({ count: addCartValue, sku_id: currentID });
          setCart(cart + addCartValue);
        }}
        >
          <Select defaultValue="1" value={addCartValue} onChange={(e) => { setAddCartValue(e.target.value); }}>
            {[...Array(currentQuantity).keys()].map((quantity) => (
              <option>{quantity + 1}</option>
            ))}
          </Select>
          <CartButton
            type="submit"
            value="Add to Cart"
          />
        </CartForm>
      </div>
    </>
  );
}
