import { format, parseISO, isThisWeek, isSameDay } from 'date-fns';
// import type { Day } from 'date-fns';

interface DateHandlerReturnType {
    getToday: () => string;
    verifySameDay: (date: string) => boolean;
    verifySameWeek: (date: string) => boolean;
}

const dateHandler = (): DateHandlerReturnType => {
    const getToday = (): string => {
        const today: Date = new Date();
        const formattedDate: string = format(today, 'yyyy-MM-dd');
        // console.log(formattedDate);
        return formattedDate;
    };

    const verifySameDay = (date: string = getToday()) => {
        const checkDate: Date = parseISO(date);
        const result: boolean = isSameDay(checkDate, parseISO(getToday()));
        // console.log(result);
        return result;
    };

    const verifySameWeek = (date: string = getToday()) => {
        const checkDate: Date = parseISO(date);
        const result: boolean = isThisWeek(checkDate, { weekStartsOn: 1 });
        // console.log(result);
        return result;
    };

    return { getToday, verifySameDay, verifySameWeek };
};

export default dateHandler;
