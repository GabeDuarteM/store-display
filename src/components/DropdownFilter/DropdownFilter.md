```js
initialState = {
  menuIsOpen: false,
  selectedItem: { id: 'price-asc', text: 'Price: low to high' },
}
;<DropdownFilter
  items={[
    { id: 'price-asc', text: 'Price: low to high' },
    { id: 'price-desc', text: 'Price: high to low' },
    { id: 'rating-asc', text: 'Rating: low to high' },
    { id: 'rating-desc', text: 'Rating: high to low' },
  ]}
  selectedItem={state.selectedItem}
  onChange={selectedItem => setState({ selectedItem })}
  menuIsOpen={state.menuIsOpen}
  handleChangeMenuIsOpen={menuIsOpen => {
    setState({ menuIsOpen })
  }}
  label="Sort by"
/>
```
