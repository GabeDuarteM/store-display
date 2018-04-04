```js
<div style={{ height: 155 }}>
  <DropdownFilterRender
    label="Label"
    getLabelProps={customProps => customProps}
    getButtonProps={customProps => customProps}
    getItemProps={customProps => customProps}
    isOpen
    handleChangeMenuIsOpen={() => {}}
    selectedItem={{ id: 'price-asc', text: 'item 1' }}
    width={200}
    items={[
      { id: 'price-asc', text: 'item 1' },
      { id: 'price-desc', text: 'item 2' },
      { id: 'item-3', text: 'item 3' },
    ]}
  />
</div>
```
