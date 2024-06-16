import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from '../../store/Mail';

function UseFetch(url) {
    const mail = useSelector((state) => state.mail.mail);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const resData = await res.json();
                const arr = [];
                for (const key in resData) {
                    arr.push({ id: key, ...resData[key] });
                }
                dispatch(mailAction.getMail(arr));
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [url, dispatch]);

    return [mail];
}

export default UseFetch;
