/**
 * 
 * 
 * @export
 * @param {any} text 
 * @returns  {object} object
 */
export default function sweetAlert(text) {
  const swalObject = {
    title: 'Are you sure?',
    text,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false
  };
  return swalObject;
}
