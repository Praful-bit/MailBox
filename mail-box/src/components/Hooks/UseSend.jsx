import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { mailAction } from '../../store/Mail';

const useSend = () => {
    const dispatch = useDispatch();

    const sendMail = useCallback(async (url, message) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            dispatch(mailAction.addMail(data));
            console.log(data);
        } catch (err) {
            console.error('Failed to send mail:', err);
        }
    }, [dispatch]);

    return sendMail;
};

export default useSend;
