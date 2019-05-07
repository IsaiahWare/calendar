export const generateWeeks = (date) => {
    const firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const numDaysCurrentMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const numDaysLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastMonth = new Date(date.getFullYear(), date.getMonth()-1, 1).getMonth();
    const nextMonth = new Date(date.getFullYear(), date.getMonth()+1, 1).getMonth();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const lastYear = currentYear - 1;
    const nextYear = currentYear + 1;
    let dayCounter = 1;
    let numWeeks = 5;
    let weeks = [];

    if (firstDayCurrentMonth >= 5 && numDaysCurrentMonth === 31) {
        numWeeks = 6
    } else if (firstDayCurrentMonth === 0 && numDaysCurrentMonth === 28) {
        numWeeks = 4;
    } else if (firstDayCurrentMonth === 6 && numDaysCurrentMonth >= 30) {
        numWeeks = 6
    }

    for (let i = 0; i < numWeeks; i++) {
        let week = [
            {day: 0, id: ""},
            {day: 0, id: ""},
            {day: 0, id: ""},
            {day: 0, id: ""},
            {day: 0, id: ""},
            {day: 0, id: ""},
            {day: 0, id: ""}
        ];

        switch(i) {
            
            case 0: // first week
                week.map( function(obj, idx) {
                    if (idx < firstDayCurrentMonth) {
                        obj["day"] = numDaysLastMonth-firstDayCurrentMonth+idx+1;
                        obj["faded"] = true;
                        if (currentMonth === 0) {
                            obj["id"] = `${lastYear}${11}${obj["day"]}`;
                        } else {
                            obj["id"] = `${currentYear}${lastMonth}${obj["day"]}`;
                        }
                    } else {
                        obj["day"] = dayCounter++;
                        obj["id"] = `${currentYear}${currentMonth}${obj["day"]}`;
                    }
                    return obj;
                })
                break;
            case (numWeeks-1): //last week
                week.map( function(obj)  {
                    if (dayCounter <= numDaysCurrentMonth) { //within current month
                        obj["day"] = dayCounter++;
                        obj["id"] = `${currentYear}${currentMonth}${obj["day"]}`;
                    } else { //next month
                        obj["day"] = (dayCounter++) - numDaysCurrentMonth;
                        obj["faded"] = true;
                        if (currentMonth === 11) {
                            obj["id"] = `${nextYear}0${obj["day"]}`;
                        } else {
                            obj["id"] = `${currentYear}${nextMonth}${obj["day"]}`;
                        }
                    }
                    return obj;
                })
                break;

            default: //every other week
                week.map( function(obj)  {
                    obj["day"] = dayCounter++;
                    obj["id"] = `${currentYear}${currentMonth}${obj["day"]}`;
                    return obj;
                })
                break;
        }
        
        weeks.push(week);
    }

    return weeks;
}