```js
initialState = {
  options: [{ id: 'woman', text: 'Woman' }, { id: 'man', text: 'Man' }],
  activeOption: 'woman',
}
;<RadioButtonFilter
  onChange={id => {
    setState({
      activeOption: id,
    })
  }}
  options={state.options}
  activeOption={state.activeOption}
/>
```
