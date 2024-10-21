function renderResult(list, classSuffix = '') {
    var wrapper = document.querySelector('.result-section');
    var element = document.createElement("div");
    element.classList.add('result');
    if (classSuffix) {
        element.classList.add(classSuffix);
    }
    for (var i = 0; i < (classSuffix === 'days' ? 12 : list.length); i++) {
        const valueItem = document.createElement("div");
        valueItem.classList.add('value-item');
        if (classSuffix) {
            valueItem.classList.add(classSuffix);
            if (i >= list.length) {
                valueItem.classList.add('hidden');
            }
        }
        valueItem.innerHTML = i < list.length ? list[i] : '';
        element.appendChild(valueItem);
    }
    wrapper.appendChild(element);
}

const calculate = (animalYr, birthMonth, dayOfBirth) => {
    const totalMonths = 12;
    const totalDays = 7;

    // get the rotated lists of the years, months, days
    let years = getRotatedList(animalYr, totalMonths);
    let months = getRotatedList(birthMonth, totalMonths);
    let days = getRotatedList(dayOfBirth, totalDays);
    console.log('Rotated List = ' + years);
    console.log('Rotated List = ' + months);
    console.log('Rotated List = ' + days);
    renderResult(years);
    renderResult(months);
    renderResult(days, 'days');

    // calculate the values of each column of year, month, and day
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
//	var vals = document.getElementById('values');
//	vals.innerHTML = 'Values: ' + values.toString();
    renderResult(values, 'values');

    // calculate numbers that represent the status of life in each of the 3 stages
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
//	var gpVals = document.getElementById('ageGroupValues');
//	gpVals.innerHTML = 'Group values: ' + ageGroupValues.toString();
    renderResult(ageGroupValues, 'stage-status');

    // calculate the class level. Levels: 52, 64, 76
    console.log('Class Level =  ' + (ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]));
//	var clLvel = document.getElementById('level');
//	clLvel.innerHTML = 'Class Level =  ' + (ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]);
	const finalResult = (ageGroupValues[0] + ageGroupValues[1] + ageGroupValues[2]);
    renderResult([finalResult], 'final-result');

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
    return l;
}

const populateYearSelect = (list, id, list2 = []) => {
    var yearSelect = document.getElementById(id);
//    var placeHolder = document.createElement('option');
//    placeHolder.value = 'Select ' + id;
//    placeHolder.innerHTML = 'Select ' + id;
//    yearSelect.appendChild(placeHolder);

    for (var i = 0; i < list.length; i++) {
        var opt = document.createElement('option');
        opt.value = i + 1;
        if (id === 'month') {
            opt.innerHTML = list[i] + ' | ' + list2[i];
        } else {
            opt.innerHTML = list[i];
        }
        //    console.log(yearSelect)
        yearSelect.appendChild(opt);
    }
}

function checkSelections() {
    const selectElements = document.querySelectorAll('select');
    let allSelected = true;

    selectElements.forEach(select => {
        if (select.value === "-1") {
            allSelected = false;
        }
    });

    document.getElementById("submitBtn").disabled = !allSelected;
}

const onSumit = () => {
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");
    let selectDay = document.getElementById("day");
    const yearValue = parseInt(selectYear.value);
    const monthValue = parseInt(selectMonth.value);
    const dayValue = parseInt(selectDay.value);

    console.log('Year: ', yearValue, ' Month: ', monthValue, ' Day: ', dayValue);
    calculate(yearValue, monthValue, dayValue);
}

// ===================
var animalYearsName = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
var monthsName = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];
var monthsInKhmer = ['មករា','កុម្ភះ','មិនា','មេសា','ឧសភា','មិថុនា','កក្តដា','សីហា','កញ្ញា','តុលា','វិច្ឆកា','ធ្នូ'];
var khmerMonthsName = ['មិគសិ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ', 'ជេស្ឋ', 'អាសាធ', 'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កក្តិក'];
var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


populateYearSelect(animalYearsName, 'year');
populateYearSelect(khmerMonthsName, 'month', monthsInKhmer);
populateYearSelect(dayName, 'day');

// Call checkSelections() on page load and when any select changes
document.addEventListener('DOMContentLoaded', checkSelections);
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', checkSelections);
});
// ====================


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