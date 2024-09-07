

export const  handleCloseModal = (modalId: string) => {

    const modal = document.getElementById(modalId) as HTMLInputElement;

    if(modal) {
        modal.checked = false
    }
}
 