```js
initialState = {
  isWishlisted: false,
}
;<ProductCard
  imgUrl="https://images.eastbay.com/pi/18837091/zoom/nike-legend-2.0-long-sleeve-t-shirt-mens"
  brand="Nike"
  id="5a5180507dceaccd20a314e0"
  name="Legend 2.0 Long Sleeve"
  price={24.99}
  isWishlisted={state.isWishlisted}
  isNew
  toggleIsWishlisted={() => setState({ isWishlisted: !state.isWishlisted })}
/>
```
