import { format, parseISO, isThisWeek, isSameDay } from 'date-fns';
// import type { Day } from 'date-fns';

const dateHandler = () => {
    const getToday = () => {
        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd');
        // console.log(formattedDate);
        return formattedDate;
    };

    const verifySameDay = (date = getToday()) => {
        const checkDate = parseISO(date);
        const result = isSameDay(checkDate, parseISO(getToday()));
        // console.log(result);
        return result;
    };

    const verifySameWeek = (date = getToday()) => {
        const checkDate = parseISO(date);
        const result = isThisWeek(checkDate, { weekStartsOn: 1 });
        // console.log(result);
        return result;
    };

    return { getToday, verifySameDay, verifySameWeek };
};

export default dateHandler;
