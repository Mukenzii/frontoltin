
import { useState } from 'react';
import './toast.styles.scss'

const Toaster = ({ message, position, time }) => {
    const [isVisible, setIsVisible] = useState();

    return (
        <div>
            {message || 'Toaster'}
        </div>
    )
}

export default Toaster;