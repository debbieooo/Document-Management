import sweetAlert from '../../src/alert';
describe('alert function', ()  => {
  const alert = {
    text: 'happy birthday',
    color: 'blue'
  }
const expectedResult =  {
    title: 'Are you sure?',
    text: 'hello',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false
}
  const swal = sinon.spy(sweetAlert);
  it('should return the object', () => {
   expect(sweetAlert('hello')).to.eql(expectedResult)
  })
});