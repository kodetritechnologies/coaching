import Swal from "sweetalert2";

/**
 * Common SwAl Helper for consistent project alerts
 */
export const swalHelper = {
    /**
     * Confirmation dialog for delete actions
     * @param {string} title 
     * @param {string} text 
     * @returns {Promise<boolean>}
     */
    confirmDelete: async (title = "Are you sure?", text = "You won't be able to revert this!") => {
        const result = await Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: '#6e7881',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'px-4 rounded-pill fw-bold',
                cancelButton: 'px-4 rounded-pill fw-bold'
            }
        });
        return result.isConfirmed;
    },

    /**
     * Reusable success alert
     */
    success: (title, text) => {
        return Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonColor: 'var(--primary)',
            customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'px-4 rounded-pill fw-bold'
            }
        });
    },

    /**
     * Reusable error alert
     */
    error: (title, text) => {
        return Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonColor: 'var(--primary)',
            customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'px-4 rounded-pill fw-bold'
            }
        });
    }
};

export default swalHelper;
