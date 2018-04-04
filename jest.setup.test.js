describe('transformConsoleMessagesToExceptions', () => {
  it('should throw if console.warn is called', () => {
    // eslint-disable-next-line no-console
    expect(() => console.warn('should throw')).toThrow('should throw')
  })

  it('should throw if console.error is called', () => {
    // eslint-disable-next-line no-console
    expect(() => console.error('should throw')).toThrow('should throw')
  })
  // The above error occurred in the
  it("should not throw if console.error is called with react's complementary error message", () => {
    // eslint-disable-next-line no-console
    console.error(new Error('The above error occurred in the'))
  })
})
