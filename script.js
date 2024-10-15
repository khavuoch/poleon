var animalYearsName = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
var monthsName = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];
var khmerMonthsName = ['មិគសិ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ', 'ជេស្ឋ', 'អាសាធ', 'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កក្តិក'];
var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const enterInfo = (animalYr, birthMonth, dayOfBirth) => {
    const totalMonths = 12;
    const totalDays = 7;

    let years = getRotatedList(animalYr, totalMonths);
    let months = getRotatedList(birthMonth, totalMonths);
    let days = getRotatedList(dayOfBirth, totalDays);

    let values = []
    for (var i = 0; i < totalMonths; i++) {
        let x = 0;
        if (i < days.length) {
            x = years[i] + months[i] + days[i];
        } else {
            x = years[i] + months[i];
        }
        values[i] = getEvaluatedValue(x);
    }
    console.log('Values =       ' + values);

    let ageGroupValues = [];

    var ind = 0;
    for (var k = 0; k < totalMonths; k+=4) {
        let sum = 0;
        for (var l = k; l < 4+k && k < totalMonths; l++) {
            sum += values[l];
        }
        ageGroupValues[ind] = sum;
        ind++;
    }
    console.log('ageGrpValues = ' + ageGroupValues);

    console.log('Class Level =  ' + (ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]));
}

const getEvaluatedValue = (value) => {
    let result = value;
    if (result === 12 || result === 24) {
        result = 0;
    } else if (result > 12 && result < 24) {
        result = result - 12;
    } else if (result > 24) {
        result = result - 24;
    }
    return result;
}

const getRotatedList = (startNum, sizeOfList) => {
    let l = [];
    let curNum = startNum;
    for (var i = 0; i < sizeOfList; i++) {
        if (curNum > sizeOfList) {
            curNum = 1; // reset the number
        }
        l[i] = curNum;
        curNum++;
    }
    console.log('Rotated List = ' + l);
    return l;
}

const populateYearSelect = (list, id) => {
    var yearSelect = document.getElementById(id);
//    var placeHolder = document.createElement('option');
//    placeHolder.value = 'Select ' + id;
//    placeHolder.innerHTML = 'Select ' + id;
//    yearSelect.appendChild(placeHolder);

    for (var i = 0; i < list.length; i++) {
        var opt = document.createElement('option');
        opt.value = i + 1;
        opt.innerHTML = list[i];
        //    console.log(yearSelect)
        yearSelect.appendChild(opt);
    }
}

enterInfo(1, 1, 1);
populateYearSelect(animalYearsName, 'year');
populateYearSelect(khmerMonthsName, 'month');
populateYearSelect(dayName, 'day');

const onSumit = () => {
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");
    let selectDay = document.getElementById("day");

    const yearValue = parseInt(selectYear.value);
    const monthValue = parseInt(selectMonth.value);
    const dayValue = parseInt(selectDay.value);

    console.log('Year: ', yearValue, ' Month: ', monthValue, ' Day: ', dayValue);
    enterInfo(yearValue, monthValue, dayValue);

}


//const getDropdownOptionList = (array) => {
//    const dropdownOptions = [];
//
//    array.forEach((e, i) => {
//        const option = {
//            rankOrder: i + 1,
//            optionText: e,
//            optionId: i + 1,
//            disabled: false
//        }
//        dropdownOptions.push(option);
//    });
//    console.log(dropdownOptions);
////    return dropdownOptions;
//};



//const animalYear = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
//const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];
//const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//// Forecast future condition of life based on Nepoleon rules (Theory, model, principles)
//const POOR = 52;
//const MIDDLE_CLASS = 64;
//const RICH = 76;
//
//const enterInfo = (zodic: number, birthMonth: number, dayOfBirth: number) => {
//    const totalMonths = 12;
//    const totalDays = 7;
//
//    let years: number[] = getRotatedList(zodic, totalMonths);
//    let months: number[] = getRotatedList(birthMonth, totalMonths);
//    let days: number[] = getRotatedList(dayOfBirth, totalDays);
//
//    let values: number[] = []
//    for (var i = 0; i < totalMonths; i++) {
//        let x = 0;
//        if (i < days.length) {
//            x = years[i] + months[i] + days[i];
//        } else {
//            x = years[i] + months[i];
//        }
//        values[i] = getEvaluatedValue(x);
//    }
//    console.log('Values =       ' + values);
//    setCalculatedValues(values);
//
//    let ageGroupValues: number[] = [];
//
//    var ind = 0;
//    for (var k = 0; k < totalMonths; k+=4) {
//        let sum = 0;
//        for (var l = k; l < 4+k && k < totalMonths; l++) {
//            sum += values[l];
//        }
//        ageGroupValues[ind] = sum;
//        ind++;
//    }
//    console.log('ageGrpValues = ' + ageGroupValues);
//    setAgeGroup(ageGroupValues);
//
//    console.log('Class Level =  ' + (ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]));
//    setClassLevel(ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]);
//}
//
//const getEvaluatedValue = (value: number) => {
//    let result = value;
//    if (result === 12 || result === 24) {
//        result = 0;
//    } else if (result > 12 && result < 24) {
//        result = result - 12;
//    } else if (result > 24) {
//        result = result - 24;
//    }
//    return result;
//}
//
//const getRotatedList = (startNum: number, sizeOfList: number): number[] => {
//    let l = [];
//    let curNum = startNum;
//    for (var i = 0; i < sizeOfList; i++) {
//        if (curNum > sizeOfList) {
//            curNum = 1; // reset the number
//        }
//        l[i] = curNum;
//        curNum++;
//    }
//    console.log('Rotated List = ' + l);
//    return l;
//}
//
//const getDropdownOptionList = (array: string[]): DropDownOption[] => {
//    const dropdownOptions: DropDownOption[] = [];
//
//    array.forEach((e, i) => {
//        const option: DropDownOption = {
//            rankOrder: i + 1,
//            optionText: e,
//            optionId: i + 1,
//            disabled: false
//        }
//        dropdownOptions.push(option);
//    });
//    return dropdownOptions;
//};