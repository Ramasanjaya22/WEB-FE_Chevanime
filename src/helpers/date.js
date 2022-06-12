function dateFormater(unformatDate) {
    const listMonth = [
        "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Des"
    ]
    const date = new Date(unformatDate).toLocaleDateString("id-ID");
    const rawDate = date.split(" ")[0];
    let [currentDate,currentMonth,currentYear] = rawDate.split("/");

    return `${currentDate}/${listMonth[currentMonth-1]}/${currentYear}`;
}

console.log(dateFormater('1989-08-25T00:00:00+00:00'));

 export default dateFormater;