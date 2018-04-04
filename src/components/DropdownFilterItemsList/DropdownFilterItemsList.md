```js
<div style={{ height: 155 }}>
  <DropdownFilterItemsList
    items={[
      { id: 'price-asc', text: 'Price: low to high' },
      { id: 'price-desc', text: 'Price: high to low' },
      { id: 'rating-asc', text: 'Rating: low to high' },
      { id: 'rating-desc', text: 'Rating: high to low' },
    ]}
    getItemProps={customProps => customProps}
    selectedItem={{ id: 'price-asc', text: 'Price: low to high' }}
    width={200}
  />
</div>
```
